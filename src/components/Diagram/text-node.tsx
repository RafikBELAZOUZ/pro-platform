import useStore from '@/components/Diagram/store'
import React, { memo } from 'react';
import { Edge, Node, Position, getConnectedEdges, Handle} from '@xyflow/react';
// import { cn } from '@/lib/utils'
import { useShallow } from 'zustand/react/shallow'

const selector = (state: { edges: Edge[] }) => ({
	edges: state.edges,
})

export const TextNode = memo((node: Node) => {
	const [sourceConnectable, setSourceConnectable] = React.useState(true)
	const { data, selected, id } = node
	const { edges } = useStore(useShallow(selector))
	const alledges = getConnectedEdges([node], edges)

	React.useEffect(() => {
		alledges.forEach((edge) => {
			if (edge.source === id) {
				setSourceConnectable(false)
				return
			}
		})
	}, [alledges, id])

	return (
		<div
			className=
				'bg-white border-[1px] shadow-2xl border-transparent rounded-md min-w-[200px] text-start'
		>
			<span className="py-1 px-3 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 block rounded-t-md">
            {data.label}
			</span>
			<div className="py-2 px-3 min-h-[32px]">
				<p className="text-xs whitespace-pre-wrap">{data.details}</p>
			</div>
			{/* remove target edge from the first node */}
			{!data.isInitial && <Handle type="target" position={Position.Left} />}
			<Handle
				type="source"
				position={Position.Right}
				isConnectable={sourceConnectable}
			/>
		</div>
	)
})
