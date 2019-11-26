import {store} from '../index.js';

// test action
export const getusers = () =>{
    console.log("run");
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => store.dispatch({ type: "ADD_USERS", payload: data }))
    .catch(err => console.log(err));
}
