import React, { useReducer } from "react";
import errorReducer, { errorInitialState } from "./reducers/errorReducer";
import todosReducer, { todosInitialState } from "./reducers/todosReducer";

export const Store = React.createContext();

export const StoreProvider = props => {
  // Combine reducers
  const [errorState, errorDispatch] = useReducer(
    errorReducer,
    errorInitialState
  );
  const [todosState, todosDispatch] = useReducer(
    todosReducer,
    todosInitialState
  );

  // Export as one store
  const store = {
    error: [errorState, errorDispatch],
    todos: [todosState, todosDispatch]
  };

  // eslint-disable-next-line react/prop-types
  return <Store.Provider value={store}>{props.children}</Store.Provider>;
};
