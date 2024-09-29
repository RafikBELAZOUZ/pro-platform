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

// @todo load data from database

export const nodesConfig = {
    initialNodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Add user' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: 'Write name' } },
    { id: '3', position: { x: 100, y: 300 }, data: { label: 'Click submit' } },
    ],

    initialEdges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
    ],
}

