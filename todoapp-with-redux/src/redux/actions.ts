import { action} from './redux-util';

declare var window: any;

// ---------------------------------
// TodoItem
// ---------------------------------

export const changeItem = action((id, data) => ({ id, data }));
export const removeItem = action(id => ({ id }));

// ---------------------------------
// State.todos
// ---------------------------------

export const addItem = action(content => ({ content }));
export const clearCompletedItems = action();

// ---------------------------------
// State.visibilityFilter
// ---------------------------------

export const changeVisilityFilter = action(filter => ({ filter }));
