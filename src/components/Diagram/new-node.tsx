import React from 'react';
import { NodeTypes } from './node-types';

export const AddNodePanel = () => {
  // using HTML Drag and Drop API
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeTypes
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="p-2 font-semibold">
        <h2>Add New Node</h2>
      </div>
      <hr />

      <div className="p-2 mt-3 w-fit min-w-[200px]">
        <div
          className="border border-primary bg-primary/5 text-primary-foreground hover:border-primary/90 hover:bg-primary/10 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
          onDragStart={(event) => onDragStart(event, 'textNode')}
          draggable
        >
          <span className="font-semibold text-primary">Test Step</span>
        </div>
        <div
          className="border border-primary bg-primary/5 text-primary-foreground hover:border-primary/90 hover:bg-primary/10 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors"
          onDragStart={(event) => onDragStart(event, 'valueNode')}
          draggable
        >
          <span className="font-semibold text-primary">Test Value</span>
        </div>
      </div>

      <hr />
      <div className="p-2 font-semibold">
        <h2>Test Cases Editor</h2>
      </div>
      <div className="p-2 mt-3 w-fit min-w-[200px]">
        <div
          className="border border-primary bg-primary/5 text-primary-foreground hover:border-primary/90 hover:bg-primary/10 py-2 px-3 rounded-md cursor-pointer flex flex-col items-center gap-2 transition-colors">
          <span className="font-semibold text-primary">Add Test Case</span>
        </div>
      </div>
    </aside>
  );
};
