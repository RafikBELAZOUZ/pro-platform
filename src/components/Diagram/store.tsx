import React, { useState, useCallback } from 'react';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import { nodesConfig } from './diagram-data-loader';

// Node data type
export type NodeData = {
  label: string;
  isInitial?: boolean;
};

// Node types
export type NodeTypes = 'textNode';

// Hook to manage the state for nodes and edges
const useDiagram = () => {
  // State for nodes, edges, and selected node
  const [nodes, setNodes] = useState<Node[]>(nodesConfig.initialNodes);
  const [edges, setEdges] = useState<Edge[]>(nodesConfig.initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Function to handle node selection
  const handleSetSelectedNode = useCallback((node: Node | null) => {
    setSelectedNode(node);

    // Deselect the currently selected node if node is null
    if (node === null) {
      const currentlySelectedNode = nodes.find((n) => n.selected === true);
      if (currentlySelectedNode) {
        handleNodesChange([
          {
            type: 'select',
            id: currentlySelectedNode.id,
            selected: false,
          },
        ]);
      }
    }
  }, [nodes]);

  // Function to handle changes to nodes
  const handleNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
  }, []);

  // Function to handle changes to edges
  const handleEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((currentEdges) => applyEdgeChanges(changes, currentEdges));
  }, []);

  // Function to handle new connections
  const handleConnect: OnConnect = useCallback((connection: Connection) => {
    setEdges((currentEdges) => addEdge(connection, currentEdges));
  }, []);

  // Function to update a node's label
  const updateNodeLabel = useCallback((nodeId: string, nodeVal: string) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeVal,
            },
          };
        }
        return node;
      })
    );
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode: handleSetSelectedNode,
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect: handleConnect,
    updateNodeLabel,
  };
};

export default useDiagram;
