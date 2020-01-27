import React from 'react';
import styled from 'styled-components';

export const FlexR = styled.div`
	display: flex;
	flex-direction: row;
`;

export const FlexC = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ItemList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	padding: 5px 20px;
	border-bottom: 1px solid grey;
`;

export const E = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const List: React.FC<{
	items: any[];
	ItemComponent;
	keyExtract;
	direction?: 'vertical' | 'horizontal';
}> = ({ items, ItemComponent, keyExtract, direction = 'vertical' }) => {
	const Content = (
		<>
			{items.map(item => (
				<ItemComponent key={keyExtract(item)} {...item} />
			))}
		</>
	);
	return direction == 'vertical' ? (
		<FlexC>{Content}</FlexC>
	) : (
		<FlexR>{Content}</FlexR>
	);
};

export const Example = () => <div>OK</div>;
