import { Node } from '@xyflow/react';
import { AddNodePanel } from '../Diagram/new-node';
import useDiagram from './store';
import { TextPanel } from './text-panel';

// Selector function to extract selectedNode from the store
const selector = (state: { selectedNode: Node | null }) => ({
	selectedNode: state.selectedNode,
});

export const Panel = () => {
	// Use the selector to get selectedNode from the store
	const { selectedNode } = useDiagram(selector);

	// Dynamically get the correct panel component
	const CurrentPanel = getPanel(selectedNode?.type || '');

	return (
		<div className="bg-white h-full border-gray-200 border border-t-0">
			{/* Render the CurrentPanel component */}
			<CurrentPanel />
		</div>
	);
};

// Function to determine the correct panel component
const getPanel = (type: string) => {
	// Extend with more panels when needed
	if (type === 'textNode') {
		return TextPanel;
	}
	return AddNodePanel; // Default to AddNodePanel if not textNode
};
