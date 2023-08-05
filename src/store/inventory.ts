import { MyCreateSlice } from ".";
import baseGear from "../config/base-gear";
import { Gear, ModifierType, Rarity } from "../shared/types";

export interface InventorySlice {
  gear: Record<string, Gear>,
}

const createInventorySlice: MyCreateSlice<InventorySlice, []>
= (set, get) => {
  return {
    gear: {
      woodenPickaxe1234: {
        ...baseGear.woodenPickaxe,
        rarity: Rarity.Magic,
        implicitModifier: {
          mod: ModifierType.MiningPower,
          value: 6,
        },
        prefixes: [{
          mod: ModifierType.ActionSpeed,
          value: 13,
        }],
        suffixes: []
      }
    }
  };
};

export default createInventorySlice;