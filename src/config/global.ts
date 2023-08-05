import { ResourceType } from "../shared/types";
import { Scene } from "../store/scenes";

// Note: Version has 3 parts: major, minor and patch
// If major or minor is different than a save data migration is required.
// Otherwise a patch version is used. Ex. Between 0.2.123 and 0.2.450 no migration is required.
const global = {
  version: "0.1.0",
  startingResources: {
    [ResourceType.Gold]: 5000,
    [ResourceType.Wood]: 5000,
  },
  startingScene: Scene.Mining,
  autoLoadEnabled: false,
  isDebug: true,
};

export default global;