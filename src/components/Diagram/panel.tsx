import useStore from './store'
import { Node } from '@xyflow/react';
import { AddNodePanel } from '../Diagram/new-node';
import { TextPanel } from './text-panel';
import { ValuePanel } from './panels/value-panel';
import { useShallow } from 'zustand/react/shallow'
import useNhostFunction from '@/hooks/useNhostFunction';
import { useUserEmail, useUserId } from '@nhost/nextjs';

const selector = (state: { selectedNode: Node | null }) => ({
	selectedNode: state.selectedNode,
})

const deleteAccount = async () => {
    const userId = useUserId();
    const nhostFunction = useNhostFunction();
    const description = await nhostFunction('/team/remove', {userId: userId});
    console.log("fefef")
    console.log(description)
}

export const Panel = () => {
	const { selectedNode } = useStore(useShallow(selector))
	const CurrentPanel = getPanel(selectedNode?.type || '')

    //@todo
    deleteAccount()

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
    if (type === 'valueNode') {
		return ValuePanel
	}
	return AddNodePanel
}
