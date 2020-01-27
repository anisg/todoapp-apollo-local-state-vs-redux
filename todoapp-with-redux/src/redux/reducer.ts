import { createStore, applyMiddleware } from 'redux';
import * as A from './actions';
import * as S from './state';

// ---------------------------------
// Reducers
// ---------------------------------

const todos = (state, action) => {
	switch (action.type) {
		case A.changeItem.type:
			return state.map(x => (x.id == action.id ? { ...x, ...action.data } : x));
		case A.removeItem.type:
			return state.filter(x => x.id != action.id);
		case A.clearCompletedItems.type:
			return state.filter(x => x.status != 'completed');
		case A.addItem.type:
			return [
				...state,
				{
					id: state.length,
					content: action.content,
					status: 'active',
					isLoading: false,
				},
			];
		default:
			return state;
	}
};

const visibilityFilter = (state, action) => {
	switch (action.type) {
		case A.changeVisilityFilter.type:
			return action.filter;
		default:
			return state;
	}
};

export const rootReducer = (state, action) => ({
	...state,
	todos: todos(state.todos, action),
	visibilityFilter: visibilityFilter(state.visibilityFilter, action),
});

export default rootReducer;

// ---------------------------------
// configStore function
// ---------------------------------

export const configStore = (reducer = rootReducer, state = S.defaultState) => {
	const store = createStore(reducer, state);
	return store;
};
