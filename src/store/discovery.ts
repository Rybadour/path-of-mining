import { mapValues, pick } from "lodash";

import global from "../config/global";
import { ResourceType } from "../shared/types";
import { MyCreateSlice } from ".";

export interface DiscoverySlice {
  discoveredResources: Partial<Record<ResourceType, boolean>>,
  discoverResources: (resources: ResourceType[]) => void,
}

const createDiscoverySlice: MyCreateSlice<DiscoverySlice, []> = (set, get): DiscoverySlice => {
  return {
    discoveredResources: mapValues(global.startingResources, (_) => true),

    discoverResources: (resources) => {
      const newDiscover = {...get().discoveredResources};
      resources.forEach(resource => {
        newDiscover[resource] = true;
      });
      set({discoveredResources: newDiscover});
    },
  };
}  

function addToDiscoverMap<K extends string | symbol>(map: Record<K, boolean>, keys: K[]) {
  const newMap = {...map};
  keys.forEach(k => {
    newMap[k] = true;
  });
  return newMap;
}

export default createDiscoverySlice;