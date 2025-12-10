import { Handle, Position } from "reactflow";

export default function ApprovalNode({ data }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        border: "1px solid #f97316",
        background: "#ffedd5",
        minWidth: 200,
        position: "relative",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={{ fontSize: 12, fontWeight: 600, color: "#c2410c" }}>
        APPROVAL
      </div>
      <div style={{ fontWeight: 600 }}>{data.title}</div>

      <div style={{ fontSize: 12 }}>Role: {data.approverRole}</div>
      <div style={{ fontSize: 12 }}>
        Auto-approve ≥ {data.autoApproveThreshold}
      </div>
    </div>
  );
}
