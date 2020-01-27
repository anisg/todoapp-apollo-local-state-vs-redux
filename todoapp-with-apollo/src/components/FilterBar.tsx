import React, { useRef, useState } from 'react';
import styled from 'styled-components';
// - Components
import { FlexR } from './util';

// -------------------------
// Styled Components
// -------------------------

const Wrap = styled(FlexR)`
	justify-content: space-between;
	padding: 0px 20px;
`;

const Button = styled.button`
	border: 1px solid black;
	background-color: white;
`;

const SelectedButton = styled(Button)`
	background-color: grey;
`;

const SegmentButton = ({ choices, selectedChoice, onSelectChoice }) => (
	<div>
		{choices.map(choice =>
			choice == selectedChoice ? (
				<SelectedButton key={choice}>{choice}</SelectedButton>
			) : (
				<Button key={choice} onClick={() => onSelectChoice(choice)}>
					{choice}
				</Button>
			)
		)}
	</div>
);

// -------------------------
// FilterBar
// -------------------------

export const FilterBar = ({
	choices,
	selectedChoice,
	onSelectChoice,
	onClearCompleted,
}) => (
	<Wrap>
		<SegmentButton
			choices={choices}
			selectedChoice={selectedChoice}
			onSelectChoice={onSelectChoice}
		/>
		<Button onClick={onClearCompleted}>Clear Completed</Button>
	</Wrap>
);
