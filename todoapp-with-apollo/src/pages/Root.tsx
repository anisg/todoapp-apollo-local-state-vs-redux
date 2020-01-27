import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
// - Components
import { FlexC } from '../components/util';
import {TodoList,InputAddItem,FilterBar} from '../components';
import ql,{gql,useQuery,useMutation} from '../generated/ql';

gql`
query showTodos {
	visibilityFilter @client
	todos @client {
		id
		status
		content
		isLoading
	}
}

mutation addTodoItem($content:String!) {
	addTodoItem(content:$content) @client { id }
}

mutation updateTodoItem($id:ID!, $content:String, $status:TodoItemStatus){
	updateTodoItem(id:$id, content:$content, status:$status) @client
}

mutation removeTodoItem($id:ID!){
	removeTodoItem(id:$id) @client {
		id
	}
}

query forFilterBar {
	visibilityFilter @client
}

mutation clearCompletedItems {
	clearCompletedItems @client
}
`


// -------------------------
// Styled Components
// -------------------------

const Wrap = styled(FlexC)`
	flex: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
`;

const Header = styled(FlexC)`
	font-size: 30px;
	font-weight: bold;
`;

const Card = styled(FlexC)`
	flex: 1;
	width: 100%;
`;

const CardItem = styled(FlexC)`
	padding: 20px;
`;

const Cont = styled(FlexC)`
	flex: 1;
	width: 100%;
	border: 1px solid black;
	align-items: center;
`;

// -------------------------
// Reduxed components
// -------------------------

const QxInputAddItem = () => {
	const [addTodoItem] = useMutation(ql.addTodoItem);

	return <InputAddItem onSubmit={content => addTodoItem({variables:{content}})} />;
};

const QxFilterBar = () => {
	const {data,updateQuery} = useQuery(ql.forFilterBar);
	const [clearCompletedItems] = useMutation(ql.clearCompletedItems);
	return (
		<FilterBar
			choices={['all','active','completed']}
			selectedChoice={data.visibilityFilter}
			onSelectChoice={choice => updateQuery(d=>({visibilityFilter:choice}))}
		    onClearCompleted={() => clearCompletedItems()}
		/>
	);
};

const QxTodoList = () => {
	const {data} = useQuery(ql.showTodos);
	const [updateTodoItem] = useMutation(ql.updateTodoItem);
	const [removeTodoItem] = useMutation(ql.removeTodoItem);
	return (
		<TodoList
            todos={
				data.visibilityFilter == 'all'
					? data.todos
					: data.todos.filter(x => (x.status as string) == (data.visibilityFilter as string))
			}
			isLoading={false}
			onChangeItemContent={ (id, content) => updateTodoItem({variables:{id,content}}) }
			onChangeItemStatus={(id, status) => updateTodoItem({variables:{id,status}}) }
			onRemoveItem={id => removeTodoItem({variables:{id}})}
		/>
	);
};

// -------------------------
// Page
// -------------------------

export default () => (
	<Wrap>
		<Header>
			Todos (with apollo local state)
			<QxInputAddItem />
		</Header>
		<Cont>
			<Card>
				<CardItem>
					<QxTodoList />
				</CardItem>
				<CardItem>
					<QxFilterBar />
				</CardItem>
			</Card>
		</Cont>
	</Wrap>
);