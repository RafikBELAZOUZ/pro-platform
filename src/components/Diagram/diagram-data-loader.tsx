import {TextNode} from "@/components/Diagram/index-text-node"
import {ValueNode} from "./nodes/value-node"
import {
  Edge,
  Node,
  Position
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

// @todo load data from database

export const nodesConfig = {
	initialNodes: [
		{
			id: '1',
			type: 'valueNode',
			data: {
				label: 'That is a value',
                details: 'hey check this video out\nhttps://youtu.be/dQw4w9WgXcQ',
				isInitial: true,
			},
			position: { x: 300, y: 400 },
			sourcePosition: Position.Right,
		},
		{
			id: '2',
			type: 'textNode',
			data: {
				label: 'Open login page',
                details: 'wow, that was a great video\n😳',
			},
			position: { x: 600, y: 300 },
			targetPosition: Position.Left,
		},
        {
			id: '3',
			type: 'textNode',
			data: {
				label: 'Enter the email and password',
                details: '',
			},
			position: { x: 700, y: 500 },
			targetPosition: Position.Left,
		},
	] as Node[],
	initialEdges: [{ id: 'e1-1', source: '1', target: '2' }] as Edge[],
	nodeTypes: {
		textNode: TextNode,
        valueNode: ValueNode,
	} as any,
}


