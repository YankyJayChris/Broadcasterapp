export function userReducer(users = [], action) {
  switch (action.type) {
    case "ADD_USERS":
      const data = action.payload;
      return {
        ...users,
        data
      };
    case "ADD_USER":
      const singledata = action.payload;
      return {
        ...users,
        singledata
      };
    case "REMOVE_USER":
      // TODO REMOVE USER FROM THE STORE
      return users;
    default:
      return users;
  }
}
