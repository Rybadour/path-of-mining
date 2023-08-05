import { ModifierConfig, ModifierType, ModifierValueType } from "../shared/types";

const modifiers: Record<ModifierType, ModifierConfig> = {
  [ModifierType.MiningPower]: {
    gearNameMod: "Powerful",
    gearStatText: "+ {{value}} Mining Power",
    valueType: ModifierValueType.Flat,
  },
  [ModifierType.ActionSpeed]: {
    gearNameMod: "Speedy",
    gearStatText: "+ {{value}} Action Speed",
    valueType: ModifierValueType.Percent,
  },
  [ModifierType.MagicFind]: {
    gearNameMod: "Innovation",
    gearStatText: "+ {{value}} Drop/Craft Rarity",
    valueType: ModifierValueType.Percent,
  },
};

export default modifiers;