import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// - Redux
import { useDispatch, useSelector, Provider } from 'react-redux';
import * as S from '../redux/state';
import * as A from '../redux/actions';
// - Components
import { FlexC } from '../components/util';
import TodoList from '../components/TodoList';
import InputAddItem from '../components/InputAddItem';
import FilterBar from '../components/FilterBar';

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

const RxInputAddItem = () => {
	const dispatch = useDispatch();
	return <InputAddItem onSubmit={content => dispatch(A.addItem(content))} />;
};

const RxFilterBar = () => {
	const dispatch = useDispatch();
	const { visibilityFilter } = useSelector(S.selectState);
	return (
		<FilterBar
			choices={['all', 'active', 'completed']}
			selectedChoice={visibilityFilter}
			onSelectChoice={choice => dispatch(A.changeVisilityFilter(choice))}
			onClearCompleted={() => dispatch(A.clearCompletedItems())}
		/>
	);
};

const RxTodoList = () => {
	const dispatch = useDispatch();
	const { isLoading, todos, visibilityFilter } = useSelector(S.selectState);

	return (
		<TodoList
			todos={
				visibilityFilter == 'all'
					? todos
					: todos.filter(x => x.status == visibilityFilter)
			}
			isLoading={isLoading}
			onChangeItemContent={(id, content) =>
				dispatch(A.changeItem(id, { content }))
			}
			onChangeItemStatus={(id, status) =>
				dispatch(A.changeItem(id, { status }))
			}
			onRemoveItem={id => dispatch(A.removeItem(id))}
		/>
	);
};

// -------------------------
// Page
// -------------------------

export default () => (
	<Wrap>
		<Header>
			Todos (with redux)
			<RxInputAddItem />
		</Header>
		<Cont>
			<Card>
				<CardItem>
					<RxTodoList />
				</CardItem>
				<CardItem>
					<RxFilterBar />
				</CardItem>
			</Card>
		</Cont>
	</Wrap>
);
