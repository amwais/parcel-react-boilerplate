export const todosInitialState = [];

export default (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return [...action.payload];
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: "",
          completed: false
        }
      ];
    case "DELETE_TODO":
      return state.filter(item => item.id !== action.payload);
    case "UPDATE_ITEM_TEXT":
      return state.map(item => {
        const { id, text } = action.payload;
        if (item.id === id) {
          return { ...item, text };
        }
        return item;
      });
    case "TOGGLE_TODO_COMPLETED":
      return [
        ...state.map(item => {
          if (item.id === action.payload) {
            return {
              ...item,
              completed: !item.completed
            };
          }
          return item;
        })
      ];
    default:
      return state;
  }
};
