import { MyCreateSlice } from ".";

export interface MiningSlice {
  update: (delta: number) => void,
}

const createMiningSlice: MyCreateSlice<MiningSlice, []>
= (set, get) => {
  return {
    update: (delta) => {

    }
  };
};

export default createMiningSlice;