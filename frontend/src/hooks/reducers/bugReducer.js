export const bugReducer = async (bugs, { type, payload }) => {
  switch (type) {
    case "add":
      return [...bugs, payload];
    case "remove":
      return bugs.filter((bug) => bug.id !== payload);
    case "edit":
      return bugs.map((bug) => (bug.id === payload.id ? payload : bug));
    default:
      return bugs;
  }
};
