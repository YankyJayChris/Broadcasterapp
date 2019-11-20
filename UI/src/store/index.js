import Store from "./Store.js";
import { redflagReducer } from "./reducers/RedFlagReducer.js";


const allReducers = {
  redFlags: redflagReducer
};

export const store = new Store(allReducers);