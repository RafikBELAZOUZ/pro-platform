import { Node } from 'reactflow'
import { AddNodePanel, TextPanel } from '../Diagram/new-node'
import useStore from './store'

const selector = (state: { selectedNode: Node | null }) => ({
	selectedNode: state.selectedNode,
})

export const Panel = () => {
	const { selectedNode } = useStore()
	const CurrentPanel = getPanel(selectedNode?.type || '')

	return (
		<div className=" bg-white h-full border-gray-200 border">
			{/* <CurrentPanel /> */}
            <div>efhue oezfjezo oezifjezo</div>
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
