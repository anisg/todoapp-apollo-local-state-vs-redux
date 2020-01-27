import {graphql,ExtQuery,VisibilityFilter} from '../util'
    /* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: forFilterBar
// ====================================================

export interface forFilterBar {
  visibilityFilter: VisibilityFilter;
}

export interface forFilterBarVariables {};

export const forFilterBar:ExtQuery<forFilterBar,forFilterBarVariables> = graphql`
    query forFilterBar {
  visibilityFilter @client
}
    
`