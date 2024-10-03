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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodesConfig } from './diagram-data-loader';

function Diagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesConfig.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(nodesConfig.initialEdges);

  // Get React Flow instance to access zoom and pan data
  const reactFlowInstance = useReactFlow();
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Handle drag over to allow node drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'; // Indicate that an element is movable
  }, []);

  // Handle drop event to add a new node with zoom and scroll adjustments
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (!nodeType) return; // Ensure something was actually dragged

      // Get the bounding rect of the diagram
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();

      // Calculate the mouse position within the canvas, adjusted for scrolling and zoom
      const mouseX = event.clientX - reactFlowBounds.left;
      const mouseY = event.clientY - reactFlowBounds.top;

      // Get the transform (viewport pan and zoom) from React Flow instance
      const { x: viewportX, y: viewportY, zoom } = reactFlowInstance.getViewport();

      // Adjust the mouse position to account for the pan and zoom
      const position = {
        x: (mouseX - viewportX) / zoom,
        y: (mouseY - viewportY) / zoom,
      };

      // Create new node based on the dragged node type
      const newNode = {
        id: `${nodes.length + 1}`, // Unique ID for the new node
        type: nodeType, // Type of node dragged (can be used for different node types)
        position, // Adjusted position with pan/zoom
        data: { label: `${nodeType} node` }, // Customize label based on the type
      };

      // Add the new node to the state
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, reactFlowInstance]
  );

  return (
    <div
      style={{ width: '100%', border: 'none', margin: '0px', padding: '0px' }}
      className="h-[calc(100vh-65px)]"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver} // Allow dropping elements
        onDrop={onDrop} // Handle drop to create a new node
        style={{ width: '100%', height: '100%' }} // Ensures ReactFlow takes full height and width
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

// Wrap Diagram in ReactFlowProvider to ensure React Flow state is available
const DiagramWrapper = () => (
  <ReactFlowProvider>
    <Diagram />
  </ReactFlowProvider>
);

export default DiagramWrapper;
