import { StoreApi } from "zustand";
import { createLens } from "@dhmk/zustand-lens";
import create from "zustand";

import createInventorySlice, { InventorySlice } from "./inventory";
import createScenesSlice, { ScenesSlice } from "./scenes";
import createMiningSlice, { MiningSlice } from "./mining";
import createDiscoverySlice, { DiscoverySlice } from "./discovery";
import createStatsSlice, { StatsSlice } from "./stats";

export type FullStore = {
  inventory: InventorySlice,
  discovery: DiscoverySlice,
  stats: StatsSlice,
  mining: MiningSlice,
  scenes: ScenesSlice,
}

const useStore = create<FullStore>((set, get) => {
  const inventory = createLens(set, get, 'inventory');
  const discovery = createLens(set, get, 'discovery');
  const stats = createLens(set, get, 'stats');
  const mining = createLens(set, get, 'mining');
  const scenes = createLens(set, get, 'scenes');

  return {
    inventory: createInventorySlice(...inventory),
    discovery: createDiscoverySlice(...discovery),
    stats: createStatsSlice(...stats, discovery[1]),
    mining: createMiningSlice(...mining),
    scenes: createScenesSlice(...scenes),
  }
});

export default useStore;

export type Lens<T> = [set: StoreApi<T>['setState'], get: StoreApi<T>['getState']];

export type MyCreateSlice<T, A extends (() => any)[]> =
  (set: StoreApi<T>['setState'], get: StoreApi<T>['getState'], ...args: A) => T