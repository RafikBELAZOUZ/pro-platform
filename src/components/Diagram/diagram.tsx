import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  BackgroundVariant,
  Edge,
	Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useShallow } from 'zustand/react/shallow'
import { Panel } from './panel'
// import { Header } from './panel'
import { nodesConfig } from './diagram-data-loader';
import useStore from './store'
import { handleDragOver, handleOnDrop } from './utils'

const selector = (state: {
	nodes: Node[]
	edges: Edge[]
	onNodesChange: any
	onEdgesChange: any
	onConnect: any
	setSelectedNode: (node: Node | null) => void
	setNodes: (node: Node) => void
    setSelectedEdge: (edge: Edge | null) => void
}) => ({
	nodes: state.nodes,
	edges: state.edges,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
	setSelectedNode: state.setSelectedNode,
	setNodes: state.setNodes,
    setSelectedEdge: state.setSelectedEdge,
})

export default function App() {
	const reactFlowWrapper = React.useRef<any>(null)
	const [reactFlowInstance, setReactFlowInstance] = React.useState<any>(null)

	const {
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		onConnect,
		setSelectedNode,
		setNodes,
        setSelectedEdge,
	} = useStore(useShallow(selector))

	const onDragOver = React.useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			handleDragOver(event)
		},
		[]
	)

	const onDrop = React.useCallback(
		(event: any) => {
			handleOnDrop(event, reactFlowWrapper, reactFlowInstance, setNodes)
		},
		[reactFlowInstance, setNodes]
	)

	return (
		<ReactFlowProvider>
			{/* <Header /> */}
			<main className="flex">
				<div
					className="h-[calc(100vh_-_48px)] flex-grow"
					ref={reactFlowWrapper}
				>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onNodeClick={(event: React.MouseEvent, node: Node) => {
							setSelectedNode(node)
						}}
                        onEdgeClick={(event: React.MouseEvent, edge: Edge) => {
							setSelectedEdge(edge)
						}}
						onConnect={onConnect}
						onPaneClick={() => {
							setSelectedNode(null)
						}}
						onDragOver={onDragOver}
						onDrop={onDrop}
						fitView
						fitViewOptions={{ maxZoom: 1 }}
						onInit={setReactFlowInstance}
						snapToGrid={true}
						nodeTypes={nodesConfig.nodeTypes}
					>
						<Controls />
						<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
					</ReactFlow>
				</div>
				<div className="hidden basis-[300px] md:block lg:basis-[350px]">
					<Panel />
				</div>
			</main>
		</ReactFlowProvider>
	)
}
