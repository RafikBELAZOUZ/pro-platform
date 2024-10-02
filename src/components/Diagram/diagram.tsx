import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodesConfig } from './diagram-data-loader';

function Diagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesConfig.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(nodesConfig.initialEdges);
  const [nodeLabel, setNodeLabel] = useState(''); // State to hold the label for new nodes

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Handle drag over to allow node drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move'; // Indicate that an element is movable
  }, []);

  // Handle drop event to add a new node
  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    // Get the canvas bounds to calculate the position of the new node
    const reactFlowBounds = event.currentTarget.getBoundingClientRect();
    const nodeType = event.dataTransfer.getData('application/reactflow');

    if (!nodeType) return; // Ensure something was actually dragged

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    // Create new node based on the dragged node type
    const newNode = {
      id: `${nodes.length + 1}`, // Unique ID for the new node
      type: nodeType, // Type of node dragged (can be used for different node types)
      position,
      data: { label: `${nodeType} node` }, // Customize label based on the type
    };

    setNodes((nds) => nds.concat(newNode)); // Add new node to the state
  }, [nodes, setNodes]);

  // Function to manually add a new node
  const addNode = () => {
    if (nodeLabel.trim() === '') return; // Do not add empty labels
    const newNode = {
      id: (nodes.length + 1).toString(), // Ensure unique ID
      position: { x: Math.random() * 250, y: Math.random() * 250 }, // Random position
      data: { label: nodeLabel }, // Use the input label
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeLabel(''); // Clear the input field after adding
  };

  return (
    <div style={{ height: '80vh', width: '100%', border: '1px solid black' }}>
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

      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)} // Update label state on input change
          placeholder="Enter node label"
          style={{ marginRight: '10px' }}
        />
        <button onClick={addNode}>Add Node</button>
      </div>
    </div>
  );
}

export default Diagram;
