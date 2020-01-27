import {graphql,ExtQuery,TodoItemStatus,VisibilityFilter,todo} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: showTodos
// ====================================================

export interface showTodos_todos {
  id: string;
  status: TodoItemStatus;
  content: string;
  isLoading: boolean;
}

export interface showTodos {
  visibilityFilter: VisibilityFilter;
  todos: showTodos_todos[];
}

export interface showTodosVariables {};

export const showTodos:ExtQuery<showTodos,showTodosVariables> = graphql`
    query showTodos {
  visibilityFilter @client
  todos @client {
    id
    status
    content
    isLoading
  }
}
    ${todo}
`