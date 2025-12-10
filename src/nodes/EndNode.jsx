import { Handle, Position } from "reactflow";

export default function EndNode({ data }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        border: "2px solid #ef4444",
        background: "#fee2e2",
        minWidth: 180,
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Left} />

      <div style={{ fontSize: 12, fontWeight: 600, color: "#b91c1c" }}>END</div>
      <div style={{ fontWeight: 600 }}>{data.message}</div>
      <div style={{ fontSize: 12 }}>
        Summary: {data.summary ? "Enabled" : "Disabled"}
      </div>
    </div>
  );
}
