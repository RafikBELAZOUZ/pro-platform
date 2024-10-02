// import { ArrowLeft } from 'lucide-react';
import { Node } from '@xyflow/react';
import React, { useState, useEffect } from 'react';

// Props to receive selectedNode, updateNodeLabel, and setSelectedNode from parent
type TextPanelProps = {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
};

export const TextPanel: React.FC<TextPanelProps> = ({
  selectedNode,
  updateNodeLabel,
  setSelectedNode,
}) => {
  const [textValue, setTextValue] = useState<string | undefined>(selectedNode?.data.label);

  useEffect(() => {
    // Update local state whenever selectedNode changes
    setTextValue(selectedNode?.data.label);
  }, [selectedNode]);

  const handleChange = (value: string) => {
    setTextValue(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, value);
    }
  };

  return (
    <>
      <div className="p-2 font-semibold flex">
        <button
          onClick={() => {
            setSelectedNode(null);
          }}
        >
          {/* <ArrowLeft /> */}
        </button>
        <h2 className="flex-grow text-center">Message</h2>
      </div>
      <hr />

      <div className="p-2 mt-3">
        <label className="block text-sm font-medium text-start text-gray-700" htmlFor="message">
          Text
        </label>
        <div className="mt-1">
          <textarea
            rows={4}
            key={selectedNode?.id}
            value={textValue}
            name="message"
            id="message"
            onChange={(e) => handleChange(e.target.value)}
            className="border block w-full border-gray-300 rounded-md sm:text-sm p-2"
          />
        </div>
      </div>
    </>
  );
};
