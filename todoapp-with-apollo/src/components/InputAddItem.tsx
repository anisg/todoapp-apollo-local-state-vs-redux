import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// -------------------------
// Styled Components
// -------------------------

const InputBar = styled.input`
	flex: 1;
	padding: 5px 5px;
	border: 1px solid grey;
	border-radius: 3px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: row;
	position: relative;
	font-size: 17px;
`;

const IconSend = styled(FontAwesomeIcon).attrs(() => ({ icon: faPaperPlane }))<{
	disabled: boolean;
}>`
	position: absolute;
	right: 5px;
	top: 30%;
	color: grey;
	${({ disabled }) => {
		if (!disabled)
			return `
			color: black;
			&:hover {
				color: blue;
				cursor: pointer;
			}
		`;
	}}
`;

// -------------------------
// InputAddItem
// -------------------------

export const InputAddItem = ({
	onSubmit,
	placeholder = 'enter message...',
	defaultValue = '',
	...props
}) => {
	const inputRef = useRef(null);
	const [value, setValue] = useState(defaultValue);
	return (
		<Form
			onSubmit={e => {
				e.preventDefault();
				if (value.length > 1) {
					onSubmit(value);
					setValue('');
				}
			}}
			{...props}
		>
			<InputBar
				ref={inputRef}
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder={placeholder}
			/>
			<IconSend
				onClick={() => {
					if (value.length) {
						onSubmit(value);
						setValue('');
					}
				}}
				disabled={value.length == 0}
			/>
		</Form>
	);
};
