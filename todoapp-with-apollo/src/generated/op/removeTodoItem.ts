import {graphql,ExtMutation,} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeTodoItem
// ====================================================

export interface removeTodoItem_removeTodoItem {
  id: string;
}

export interface removeTodoItem {
  removeTodoItem: removeTodoItem_removeTodoItem | null;
}

export interface removeTodoItemVariables {
  id: string;
}

export const removeTodoItem:ExtMutation<removeTodoItem,removeTodoItemVariables> = graphql`
    mutation removeTodoItem($id: ID!) {
  removeTodoItem(id: $id) @client {
    id
  }
}
    
`