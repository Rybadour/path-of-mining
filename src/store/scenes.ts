import { MyCreateSlice } from ".";

export enum Scene {
  Mining = "Mining",
}

export interface ScenesSlice {
  currentScene: Scene,
  switchScene: (newScene: Scene) => void,
}

const createScenesSlice: MyCreateSlice<ScenesSlice, []> = (set, get) => {
  return {
    currentScene: Scene.Mining,

    switchScene: (newScene) => {
      set({currentScene: newScene});
    },
  };
};

export default createScenesSlice;