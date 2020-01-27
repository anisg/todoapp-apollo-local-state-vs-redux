import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// - Redux
import { configStore } from './redux/reducer';
import { Provider } from 'react-redux';
// - Pages
import RootPage from './pages/Root';

const store = configStore();

// -------------------------
// App & starting point
// -------------------------

const App = () => <RootPage />;

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
