import { Handle, Position } from "reactflow";

export default function StartNode({ data }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        border: "2px solid #16a34a",
        background: "#dcfce7",
        minWidth: 180,
        position: "relative",
      }}
    >
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: 12, fontWeight: 600, color: "#166534" }}>
        START
      </div>
      <div style={{ fontWeight: 600 }}>{data.title}</div>
    </div>
  );
}
