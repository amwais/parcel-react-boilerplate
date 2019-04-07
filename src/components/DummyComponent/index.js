import React, { useEffect, useContext } from 'react';
import { Store } from '../../store';

const DummyComponent = (props) => {
	const { dummy } = useContext(Store).store;
	const [ state, dispatch ] = dummy;

	const { counter } = state;

	const handleIncrement = () => {
		dispatch({
			type: 'INCREMENT'
		});
	};

	const handleDecrement = () => {
		dispatch({
			type: 'DECREMENT'
		});
	};

	const handleReset = () => {
		dispatch({
			type: 'RESET'
		});
	};

	return (
		<div>
			<h1>DUMMY Component!</h1>
			<h2>Counter: {counter}</h2>
			<button onClick={handleIncrement}>+</button>
			<button onClick={handleDecrement}>-</button>
			<button onClick={handleReset}>Reset</button>
		</div>
	);
};

export default DummyComponent;
