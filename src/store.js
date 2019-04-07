import React, { useReducer } from 'react';
import authReducer, { authInitialState } from './reducers/authReducer';
import errorReducer, { errorInitialState } from './reducers/errorReducer';
import dummyReducer, { dummyInitialState } from './reducers/dummyReducer';

export const Store = React.createContext();

export const StoreProvider = (props) => {
	const [ authState, authDispatch ] = useReducer(authReducer, authInitialState);
	const [ errorState, errorDispatch ] = useReducer(errorReducer, errorInitialState);
	const [ dummyState, dummyDispatch ] = useReducer(dummyReducer, dummyInitialState);

	const store = {
		auth: [ authState, authDispatch ],
		error: [ errorState, errorDispatch ],
		dummy: [ dummyState, dummyDispatch ]
	};

	const reducer = { store };
	return <Store.Provider value={reducer}>{props.children}</Store.Provider>;
};
