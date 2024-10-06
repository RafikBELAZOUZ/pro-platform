import { nodesConfig } from './diagram-data-loader';
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
import { Mode } from '@/types';

export type NodeData = {
  label: string;
  isInitial?: boolean;
};

export type NodeTypes = 'textNode';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  mode: Mode;
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  setNodes: (node: Node) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeLabel: (nodeId: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
  setSelectedEdge: (edge: Edge | null) => void;
};

// Zustand store creation
const useStore = create<RFState>((set, get) => ({
  nodes: nodesConfig.initialNodes,
  edges: nodesConfig.initialEdges,
  selectedNode: null,
  selectedEdge: null,
  mode: Mode.READONLY,

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

  highlightNode: (node: Node | null) => {
    
  },

  highlightEdge: (edge: Edge | null) => {
    
    },

  setSelectedEdge: (edge: Edge | null) => {
    const currentEdges = get().edges;

    // Update the style of the previously selected edge to reset it
    const updatedEdges = currentEdges.map((e) => {
      if (e.id === get().selectedEdge?.id) {
        return {
          ...e,
          style: { ...e.style, stroke: 'black', strokeWidth: 1 }, // Reset previous selected edge style
        };
      }
      return e;
    });

    // Update the new selected edge
    const newEdges = updatedEdges.map((e) => {
      if (e.id === edge?.id) {
        return {
          ...e,
          style: { ...e.style, stroke: 'red', strokeWidth: 3 }, // Highlight the newly selected edge
        };
      }
      return e;
    });

    // Set the selected edge and update the edges in the state
    set({
      edges: newEdges,
      selectedEdge: edge,
    });
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
            // Return a new object to avoid mutation
            return node.id === nodeId
                ? {
                    ...node,
                    data: {
                        ...node.data,
                        label: nodeVal,
                    },
                }
                : node; // Keep the original node if not matching
        }),
    }));
},
}));

export default useStore;
