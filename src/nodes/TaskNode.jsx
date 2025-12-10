import { Handle, Position } from "reactflow";

export default function TaskNode({ data }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        border: "1px solid #0ea5e9",
        background: "#e0f2fe",
        minWidth: 200,
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: 12, fontWeight: 600, color: "#0369a1" }}>
        TASK
      </div>
      <div style={{ fontWeight: 600 }}>{data.title}</div>

      {data.assignee && <div style={{ fontSize: 12 }}>👤 {data.assignee}</div>}
      {data.dueDate && <div style={{ fontSize: 12 }}>📅 {data.dueDate}</div>}
    </div>
  );
}
