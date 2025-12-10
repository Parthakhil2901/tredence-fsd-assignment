import { useRef, useCallback } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

import { useWorkflowStore } from "../hooks/useWorkflowStore";
import { nodeTypes } from "../nodes/nodeTypes";

export default function Canvas() {
  // ✅ FIX: Use separate selectors so Zustand doesn’t cause infinite loops
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);
  const onNodesChange = useWorkflowStore((s) => s.onNodesChange);
  const onEdgesChange = useWorkflowStore((s) => s.onEdgesChange);
  const onConnect = useWorkflowStore((s) => s.onConnect);
  const addNodeAtPosition = useWorkflowStore((s) => s.addNodeAtPosition);
  const setSelectedNode = useWorkflowStore((s) => s.setSelectedNode);

  // Canvas ref to calculate drop position
  const wrapperRef = useRef(null);

  // Allow drag-over from sidebar
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Drop to create a new node on the canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;

      const bounds = wrapperRef.current.getBoundingClientRect();

      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      addNodeAtPosition(nodeType, position);
    },
    [addNodeAtPosition]
  );

  return (
    <div
      ref={wrapperRef}
      style={{ flex: 1, height: "100%", background: "white" }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes} // stays stable, defined outside component
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={(e, node) => setSelectedNode(node.id)}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
