import {graphql,ExtMutation,} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addTodoItem
// ====================================================

export interface addTodoItem_addTodoItem {
  id: string;
}

export interface addTodoItem {
  addTodoItem: addTodoItem_addTodoItem;
}

export interface addTodoItemVariables {
  content: string;
}

export const addTodoItem:ExtMutation<addTodoItem,addTodoItemVariables> = graphql`
    mutation addTodoItem($content: String!) {
  addTodoItem(content: $content) @client {
    id
  }
}
    
`