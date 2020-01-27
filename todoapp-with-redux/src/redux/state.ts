// ---------------------------------
// state classes
// ---------------------------------

export class TodoItem {
	id: number;
	content: string;
	status: 'active' | 'completed';
	isLoading: boolean = false;
}

export class State {
	todos: TodoItem[] = [];
	isLoading: boolean = false;
	visibilityFilter: 'all' | 'active' | 'completed' = 'all';
}

export const defaultState = new State();
// ---------------------------------
// Selector functions
// ---------------------------------

export const selectState = (state: State) => state;
