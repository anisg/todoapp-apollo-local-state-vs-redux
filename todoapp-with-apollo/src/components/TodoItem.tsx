import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
const InputBar = styled.input<{ completed: boolean }>`
	flex: 1;
	padding: 5px 5px;
	border-radius: 3px;
	font-size: 17px;
	border: 0;
	${({ completed }) =>
		completed && 'font-style: italic; text-decoration: line-through;'}
`;

const Form = styled.div`
	display: flex;
	flex-direction: row;
	position: relative;
	border: 1px solid grey;
`;

const Icon = styled(FontAwesomeIcon)<{ color: any; icon: any }>`
	position: absolute;
	right: 5px;
	top: 30%;
	${({ color }) => `
	color: ${color.primary};
	&:hover {
		color: ${color.hover};
		cursor: pointer;
	}
	`}
`;

const _Cont = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Check = ({ checked, onToggle }) => (
	<_Cont>
		<input type="checkbox" checked={checked} onChange={onToggle} />
		<span></span>
	</_Cont>
);

const IconSync = props => (
	<Icon
		icon={faSpinner}
		color={{ primary: 'black', hover: 'grey' }}
		{...props}
	/>
);
const IconRemove = props => (
	<Icon icon={faTimes} color={{ primary: 'black', hover: 'grey' }} {...props} />
);

//--------------------------
//--------------------------
// TodoItem
//--------------------------
//--------------------------

export const TodoItem = ({
	value,
	completed,
	isSync = false,
	onChangeText,
	onToggle,
	onRemove,
	...props
}) => {
	const [v, setValue] = useState(value);
	const inputRef = useRef(null);
	return (
		<Form>
			<Check checked={completed} onToggle={onToggle} />
			<InputBar
				value={v}
				ref={inputRef}
				onChange={e => setValue(e.target.value)}
				onBlur={() => v != value && onChangeText(v)}
				onKeyDown={(e: any) => {
					if (e.key == 'Escape') e.target.blur();
					else if (e.key == 'Enter') e.target.blur();
				}}
				completed={completed}
			/>
			{isSync ? <IconSync /> : <IconRemove onClick={onRemove} />}
		</Form>
	);
};