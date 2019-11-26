import Store from "./Store.js";
import { redflagReducer } from "./reducers/RedFlagReducer.js";
import { userReducer } from "./reducers/UserReducer.js";


const allReducers = {
  redFlags: redflagReducer,
  users: userReducer
};

export const store = new Store(allReducers);