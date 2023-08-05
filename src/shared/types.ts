export enum GearType {
  Pickaxe = "Pickaxe",
  Wrench = "Wrench",

  Helmet = "Helmet",
  Chest = "Chest",
  Boots = "Boots",
  Ring = "Ring",
  Amulet = "Amulet",
  Belt = "Belt",
}

export enum ResourceType {
  Gold = "Gold",
  Wood = "Wood",
  Tools = "Tools",
  Renown = "Renown",
  MilitaryPower = "Power",
}

export interface ResourceConfig {
  icon: string;
  sellPrice: number;
}

export type ResourcesMap = Record<ResourceType, number>;
export const defaultResourcesMap: ResourcesMap = {
  [ResourceType.Gold]: 0,
  [ResourceType.Wood]: 0,
  [ResourceType.Tools]: 0,
  [ResourceType.Renown]: 0,
  [ResourceType.MilitaryPower]: 0,
};

export type BaseGear = {
  id: string,
  name: string,
  icon: string,
  type: GearType,
  implicitModifier: ModifierRange,
  potentialPreffixes: Partial<Record<ModifierType, AffixConfig>>,
  potentialSuffixes: Partial<Record<ModifierType, AffixConfig>>,
};

export enum ModifierType {
  MiningPower = "MiningPower",
  ActionSpeed = "ActionSpeed",
  MagicFind = "MagicFind",
}

export enum ModifierValueType {
  Flat = "flat",
  Percent = "percent",
}

export type ModifierConfig = {
  gearNameMod: string,
  gearStatText: string,
  valueType: ModifierValueType,
}

export type ModifierRange = {
  mod: ModifierType,
  minValue: number,
  maxValue: number,
}

export type AffixConfig = {
  minValue: number,
  maxValue: number,
  weight: number,
}

export type SpecificModifier = {
  mod: ModifierType,
  value: number,
}

export type Gear = Omit<BaseGear, 'implicitModifier' | 'potentialPreffixes' | 'potentialSuffixes'> & {
  rarity: Rarity,
  implicitModifier: SpecificModifier,
  prefixes: SpecificModifier[],
  suffixes: SpecificModifier[],
}

export enum Rarity {
  Common = "Common",
  Magic = "Magic",
  Rare = "Rare",
  Unique = "Unique",
}

export type ResourceCost = {
  resource: ResourceType,
  cost: number,
}

export enum MatchingGridShape {
  OrthoAdjacent = "orthoAdjacent",
  DiagAdjacent = "diagAdjacent",
  AllAdjacent = "allAdjacent",
  RowAndColumn = "rowAndColumn",
  NorthAdjacent = "northAdjacent",
  EastAdjacent = "eastAdjacent",
  SouthAdjacent = "southAdjacent",
  WestAdjacent = "westAdjacent",
  SideAdjacent = "sideAdjacent",
  Grid = "Grid",
}

export interface GridCoords {
  x: number;
  y: number;
}

export enum GameFeature {
  Mining,
}