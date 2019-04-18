import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Store } from './store';
import DummyComponent from './components/DummyComponent';

import './App.css';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => {
	const store = useContext(Store).store;
	const authState = store.auth[0];
	return (
		<Route
			{...rest}
			render={(props) => (authState.isAuthenticated ? <Component {...props} /> : <Redirect to="/a" />)}
		/>
	);
};

const App = () => {
	const handleAuth = () => {
		// Check for token
		if (localStorage.jwtToken) {
			// Set auth token header auth
			setAuthToken(localStorage.jwtToken);

			// Decode token and get user info and expiration
			const decoded = jwt_decode(localStorage.jwtToken);

			// Set user and isAuthenticated
			authDispatch(setCurrentUser(decoded));

			// Check for expired token
			const currentTime = Date.now() / 1000;

			if (decoded.exp < currentTime) {
				// Logout user
				authDispatch(logoutUser());

				// Redirect to login
				window.location.href = '/';
			}
		}
	};

	const store = useContext(Store).store;
	const [ authState, authDispatch ] = store.auth;

	useEffect(() => {
		handleAuth();
	});

	return (
		<Router>
			<div className="App">
				<Route exact path="/" component={DummyComponent} />
				<PrivateRoute exact path="/dashboard" component={DummyComponent} />
			</div>
		</Router>
	);
};

export default App;
