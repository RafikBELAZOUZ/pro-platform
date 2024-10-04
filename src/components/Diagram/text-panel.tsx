import { useState, useEffect } from 'react';
// import { ArrowLeft } from 'lucide-react';
import { Node } from '@xyflow/react';

interface TextPanelProps {
  selectedNode: Node | null;
  updateNodeLabel: (nodeId: string, nodeVal: string) => void;
  setSelectedNode: (node: Node | null) => void;
}

export const TextPanel = ({ selectedNode, updateNodeLabel, setSelectedNode }: TextPanelProps) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
    }
  }, [selectedNode]);

  function handleChange(value: string) {
    setLabel(value);
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, value);
    }
  }

  return (
    <>
      <div className="p-2 font-semibold flex">
        <button onClick={() => setSelectedNode(null)}>
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
            value={label}
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
