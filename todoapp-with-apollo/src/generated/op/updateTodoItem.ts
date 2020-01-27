import {graphql,ExtMutation,TodoItemStatus} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateTodoItem
// ====================================================

export interface updateTodoItem {
  updateTodoItem: boolean;
}

export interface updateTodoItemVariables {
  id: string;
  content?: string | null;
  status?: TodoItemStatus | null;
}

export const updateTodoItem:ExtMutation<updateTodoItem,updateTodoItemVariables> = graphql`
    mutation updateTodoItem($id: ID!, $content: String, $status: TodoItemStatus) {
  updateTodoItem(id: $id, content: $content, status: $status) @client
}
    
`