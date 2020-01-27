
little repository to compare apollo local state vs redux.

![screenshot](./screenshot.png)

interesting files to checkout:

Apollo Local State:

- `pages/Root.tsx` in todoapp-with-apollo/src/pages/Root.tsx
- `resolvers.ts` in todoapp-with-apollo/src/resolvers.ts 
- `index.tsx` in todoapp-with-apollo/src/index.tsx 

Redux:

- `pages/Root.tsx` in todoapp-with-redux/src/pages/Root.tsx 
- `redux/reducer.ts` in todoapp-with-redux/src/redux/reducer.ts
- `redux/actions.ts` in todoapp-with-redux/src/redux/actions.ts
- `redux/state.ts` in todoapp-with-redux/src/redux/state.ts
- `index.tsx` in todoapp-with-apollo/src/index.tsx 


## test it

### todoapp-with-apollo

```
$> cd ./todoapp-with-apollo
$> yarn install
$> yarn start
```

if you want to edit the graphql code:

```
$> yarn global add apollo
$> apollo plugins:link ./scripts/generate-local-graphql
```

above commands add homemade plugin `./scripts/generate-local-graphql` to apollo CLI, it is used to generate local typescript types

### todoapp-with-redux

```
$> cd ./todoapp-with-redux
$> yarn install
$> yarn start
```

