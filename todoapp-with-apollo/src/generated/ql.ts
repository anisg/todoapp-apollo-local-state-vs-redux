
// ~ auto generated
import * as op from './op'
import {ExtQuery,ExtMutation,ExtSubscription} from './util'
import {
    useQuery as useQueryOrig,
    useMutation as useMutationOrig,
    useSubscription as useSubscriptionOrig,
    useLazyQuery as useLazyQueryOrig,
    MutationHookOptions,
    QueryHookOptions,
    SubscriptionHookOptions,
    LazyQueryHookOptions,
} from '@apollo/client'

export function useQuery<A,B> (x:ExtQuery<A,B>,opt?:QueryHookOptions<A,B>) {
    return useQueryOrig<A,B>(x,opt);
}
export function useLazyQuery<A,B> (x:ExtQuery<A,B>,opt?:LazyQueryHookOptions<A,B>) {
    return useLazyQueryOrig<A,B>(x,opt);
}

export function useMutation<A,B> (x:ExtMutation<A,B>,opt?:MutationHookOptions<A,B>) {
    return useMutationOrig<A,B>(x,opt);
}

export function useSubscription<A,B> (x:ExtSubscription<A,B>,opt?:SubscriptionHookOptions<A,B>) {
    return useSubscriptionOrig<A,B>(x,opt);
}
export {graphql as gql} from './util'

export default op

