export default class Store {
  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }
  // this function is for component which will be used to subscribe to the store
  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    fn(this.value);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }
  // this function help to dispatch action 
  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.subscribers.forEach(fn => fn(this.value));
  }
  
  // this fuction it job is to update the state of the app
  reduce(state, action) {
    const newState = {};
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}