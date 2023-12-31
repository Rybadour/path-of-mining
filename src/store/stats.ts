import { mapValues, mergeWith } from "lodash";
import { MyCreateSlice } from ".";

import global from "../config/global";
import { DiscoverySlice } from "./discovery";
import resourcesConfig from "../config/resources";
import { ResourceType, ResourcesMap, defaultResourcesMap } from "../shared/types";
import { enumFromKey, mergeSumPartial } from "../shared/utils";

export interface StatsSlice {
  resources: ResourcesMap,
  resourcesPerSec: ResourcesMap,

  update: (elapsed: number, newResourcesPerSec: ResourcesMap | null) => void,
  updatePerSec: (newPerSec: ResourcesMap) => void,
  canAfford: (resources: Partial<ResourcesMap>) => boolean,
  useResource: (resource: ResourceType, amount: number) => void,
  useResources: (resources: Partial<ResourcesMap>) => void,
  resetResource: (resource: ResourceType) => void,
}

const DEFAULT_RESOURCES = {
  ...defaultResourcesMap,
  ...global.startingResources,
};

const createStatsSlice: MyCreateSlice<StatsSlice, [() => DiscoverySlice]> = (set, get, discovery) => {
  return {
    resources: {...DEFAULT_RESOURCES},
    resourcesPerSec: { ...defaultResourcesMap },

    update: (elapsed: number, newResourcesPerSec: ResourcesMap | null) => {
      if (newResourcesPerSec) {
        get().updatePerSec(newResourcesPerSec);
      }

      const elapsedSecs = (elapsed/1000);
      const newResources = {...get().resources};
      Object.keys(get().resourcesPerSec).forEach(r => {
        const resource = enumFromKey(ResourceType, r);
        if (resource) {
          newResources[resource] += elapsedSecs * get().resourcesPerSec[resource];
          newResources[resource] = Math.max(0, newResources[resource]);
        }
      });
      set({resources: newResources});
    },

    updatePerSec: (newPerSec) => {
      discovery().discoverResources(
        Object.keys(newPerSec)
          .map(r => enumFromKey(ResourceType, r)!)
          .filter(r => r && newPerSec[r])
      );
      set({resourcesPerSec: newPerSec});
    },

    canAfford: (cost) => {
      const resources = get().resources;
      return Object.entries(cost)
        .every(([resource, amount]) => resources[enumFromKey(ResourceType, resource)!] >= amount);
    },

    useResource: (resource, amount) => {
      const newResources = {...get().resources};
      newResources[resource] -= amount;
      set({resources: newResources});
    },

    useResources: (resources) => {
      set({resources: mergeSumPartial(get().resources, mapValues(resources, r => -(r ?? 0)))});
    },

    resetResource: (res) => {
      set({
        resources: {...get().resources, [res]: 0},
      });
    },
  }
};

export default createStatsSlice;