import React, { memo, useEffect, useState } from 'react';
import { Edge, Handle, Node, Position, getConnectedEdges } from '@xyflow/react';

interface TextNodeProps {
  node: Node; // Ensure the node is required
  edges: Edge[]; // Pass edges as a prop
}

export const TextNode = memo(({ node = {} as Node, edges = [] }: TextNodeProps) => {
    const [sourceConnectable, setSourceConnectable] = useState(true);
  
    // Destructure safely
    const { data = {}, selected = false, id = '' } = node; // Set defaults
  
    const alledges = getConnectedEdges([node], edges || []);
  
    useEffect(() => {
      const isSourceConnectable = !alledges.some(edge => edge.source === id);
      setSourceConnectable(isSourceConnectable);
    }, [alledges, id]);
  
    return (
      <div
        className=
          'bg-white border-[1px] shadow-2xl border-transparent rounded-md min-w-[200px] text-start'
      >
        <span className="py-1 px-3 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 block rounded-t-md">
          Send Message
        </span>
        <div className="py-2 px-3 min-h-[32px]">
          <p className="text-xs whitespace-pre-wrap">{data.label || 'No label'}</p> {/* Safely access data.label */}
        </div>
        {/* remove target edge from the first node */}
        {!data.isInitial && <Handle type="target" position={Position.Left} />}
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={sourceConnectable}
        />
      </div>
    );
  });

