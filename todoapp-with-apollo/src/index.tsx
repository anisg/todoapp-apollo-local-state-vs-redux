import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// - Apollo
import {  ApolloClient,  ApolloProvider,  InMemoryCache, } from "@apollo/client"
import {resolvers} from "./resolvers";
import {VisibilityFilter} from './generated/util'
// - Pages
import RootPage from './pages/Root';

const cache = new InMemoryCache();

cache.writeData({data:{
  visibilityFilter:VisibilityFilter.all,
  todos:[],
}})

const client = new ApolloClient({
  cache: cache,
  resolvers,
})

const App = () => <RootPage />;

ReactDOM.render(
  <ApolloProvider client={client}>
		<App />
  </ApolloProvider>,
	document.getElementById('root')
);
