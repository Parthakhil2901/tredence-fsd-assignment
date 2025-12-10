import { Handle, Position } from "reactflow";

export default function AutoNode({ data }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        border: "1px solid #8b5cf6",
        background: "#ede9fe",
        minWidth: 200,
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: 12, fontWeight: 600, color: "#5b21b6" }}>
        AUTOMATED STEP
      </div>
      <div style={{ fontWeight: 600 }}>{data.title}</div>

      {data.actionLabel && (
        <div style={{ fontSize: 12 }}>⚙ {data.actionLabel}</div>
      )}
    </div>
  );
}
