import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
// - Components
import * as S from './util';
import {TodoItem} from './TodoItem';

// -------------------------
// TodoList
// -------------------------

const TodoListLoading = () => <div>Loading... </div>;
const TodoListEmpty = () => <div>no items... </div>;

export const TodoList = ({
	onChangeItemContent,
	onChangeItemStatus,
	onRemoveItem,
	isLoading,
	todos,
}) => {
	if (isLoading) return <TodoListLoading />;
	if (todos.length == 0) return <TodoListEmpty />;
	return (
		<S.FlexC>
			{todos.map(({ content, status, isLoading, id }) => (
				<TodoItem
					key={id}
					value={content}
					completed={status == 'completed'}
					isSync={isLoading}
					onChangeText={v => onChangeItemContent(id, v)}
					onToggle={() =>
						onChangeItemStatus(id, status == 'active' ? 'completed' : 'active')
					}
					onRemove={() => onRemoveItem(id)}
				/>
			))}
		</S.FlexC>
	);
};
