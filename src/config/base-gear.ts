import { BaseGear, GearType, ModifierType } from "../shared/types";

const baseGear = {
  woodenPickaxe: {
    id: '',
    name: 'Wooden Pickaxe',
    icon: 'mine',
    type: GearType.Pickaxe,
    implicitModifier: {
      mod: ModifierType.MiningPower,
      minValue: 1,
      maxValue: 6,
    },
    // TODO: Affixes should be the same for all gear of the same type (I think)
    potentialPreffixes: {
      [ModifierType.ActionSpeed]: {
        minValue: 5,
        maxValue: 10,
        weight: 10,
      }
    },
    potentialSuffixes: {
      [ModifierType.MagicFind]: {
        minValue: 5,
        maxValue: 10,
        weight: 10,
      }
    }
  }
} satisfies Record<string, BaseGear>;

export default baseGear;