import {graphql,ExtMutation,} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: clearCompletedItems
// ====================================================

export interface clearCompletedItems {
  clearCompletedItems: boolean | null;
}

export interface clearCompletedItemsVariables {};

export const clearCompletedItems:ExtMutation<clearCompletedItems,clearCompletedItemsVariables> = graphql`
    mutation clearCompletedItems {
  clearCompletedItems @client
}
    
`