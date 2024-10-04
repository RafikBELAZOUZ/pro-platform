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
import { create } from 'zustand';
import { nodesConfig } from './diagram-data-loader';

export type NodeData = {
  label: string;
  isInitial?: boolean;
};

export type NodeTypes = 'textNode';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  setNodes: (node: Node) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeLabel: (nodeId: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
};

// Zustand store creation
const useStore = create<RFState>((set, get) => ({
  nodes: nodesConfig.initialNodes,
  edges: nodesConfig.initialEdges,
  selectedNode: null,

  setSelectedNode: (node: Node | null) => {
    set({ selectedNode: node });
    
    if (node === null) {
      const selectedNode = get().nodes.find((n) => n.selected === true);
      if (selectedNode) {
        get().onNodesChange([
          {
            type: 'select',
            id: selectedNode.id,
            selected: false,
          },
        ]);
      }
    }
  },

  setNodes: (node: Node) => {
    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  onNodesChange: (changes: NodeChange[]) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection: Connection) => {
    set((state) => ({
      edges: addEdge(connection, state.edges),
    }));
  },

  updateNodeLabel: (nodeId: string, nodeVal: string) => {
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: nodeVal,
          };
        }
        return node;
      }),
    }));
  },
}));

export default useStore;
