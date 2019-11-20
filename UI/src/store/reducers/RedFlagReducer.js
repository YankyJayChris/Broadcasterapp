export function redflagReducer(redFlags = [], action) {
  switch (action.type) {
    case "ADD_REDFLAGS":
      const data = action.payload;
      return {
        ...redFlags,
        data
      };
    case "ADD_REDFLAG":
      const singledata = action.payload;
      return {
        ...redFlags,
        singledata
      };
    case "REMOVE_REDFLAG":
      // TODO REMOVE REDFLAG FROM THE STORE
      return redFlags;
    default:
      return redFlags;
  }
}
