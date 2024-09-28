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

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function Diagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeLabel, setNodeLabel] = useState(''); // State to hold the label for new nodes

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Function to add a new node
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
