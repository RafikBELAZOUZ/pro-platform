import { Node } from '@xyflow/react';
import { AddNodePanel } from '../Diagram/new-node';
import useStore from './store';
import { TextPanel } from './text-panel';
import { useShallow } from 'zustand/react/shallow'

const selector = (state: { selectedNode: Node | null }) => ({
	selectedNode: state.selectedNode,
})

export const Panel = () => {
	const { selectedNode } = useStore(useShallow(selector))
	const CurrentPanel = getPanel(selectedNode?.type || '')

	return (
		<div className=" bg-white h-full border-gray-200 border border-t-0">
			<CurrentPanel />
		</div>
	)
}

const getPanel = (type: string) => {
	// when list of panels grows, use a switch statement or a map
	if (type === 'textNode') {
		return TextPanel
	}
	return AddNodePanel
}
