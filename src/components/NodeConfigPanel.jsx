import { useEffect, useState } from "react";
import { useWorkflowStore } from "../hooks/useWorkflowStore";
import { getAutomations } from "../api/automations";

export default function NodeConfigPanel() {
  const [automations, setAutomations] = useState([]);

  // Select values from Zustand safely
  const nodes = useWorkflowStore((s) => s.nodes);
  const selectedNodeId = useWorkflowStore((s) => s.selectedNodeId);
  const updateNodeData = useWorkflowStore((s) => s.updateNodeData);

  // Find selected node (SAFE — no get())
  const node = nodes.find((n) => n.id === selectedNodeId) || null;

  // Load automations only once
  useEffect(() => {
    getAutomations().then(setAutomations);
  }, []);

  const update = (field, value) => {
    if (!node) return;
    updateNodeData(node.id, { [field]: value });
  };

  // Nothing selected
  if (!node) {
    return (
      <div style={panelStyle}>
        <h3>Node Configuration</h3>
        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Select a node to edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      <h3 style={{ marginBottom: 4 }}>Configure Node</h3>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>
        ID: {selectedNodeId} • Type: {node.type}
      </p>

      {/* START NODE */}
      {node.type === "start" && (
        <>
          <Label>Start title</Label>
          <Input
            value={node.data.title || ""}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Ex: Employee Onboarding"
          />
        </>
      )}

      {/* TASK NODE */}
      {node.type === "task" && (
        <>
          <Label>Title *</Label>
          <Input
            value={node.data.title || ""}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Ex: Collect Documents"
          />

          <Label>Description</Label>
          <textarea
            value={node.data.description || ""}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Short description"
            style={textAreaStyle}
          />

          <Label>Assignee</Label>
          <Input
            value={node.data.assignee || ""}
            onChange={(e) => update("assignee", e.target.value)}
            placeholder="Ex: HR Executive"
          />

          <Label>Due date</Label>
          <Input
            type="date"
            value={node.data.dueDate || ""}
            onChange={(e) => update("dueDate", e.target.value)}
          />
        </>
      )}

      {/* APPROVAL NODE */}
      {node.type === "approval" && (
        <>
          <Label>Title</Label>
          <Input
            value={node.data.title || ""}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Ex: Manager Approval"
          />

          <Label>Approver role</Label>
          <Input
            value={node.data.approverRole || ""}
            onChange={(e) => update("approverRole", e.target.value)}
            placeholder="Manager / HRBP"
          />

          <Label>Auto-approve threshold</Label>
          <Input
            type="number"
            value={node.data.autoApproveThreshold ?? 0}
            onChange={(e) =>
              update("autoApproveThreshold", Number(e.target.value) || 0)
            }
          />
        </>
      )}

      {/* AUTOMATED STEP NODE */}
      {node.type === "auto" && (
        <>
          <Label>Title</Label>
          <Input
            value={node.data.title || ""}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Ex: Send welcome email"
          />

          <Label>Action</Label>
          <select
            value={node.data.actionId || ""}
            onChange={(e) => {
              const actionId = e.target.value;
              const selected = automations.find((a) => a.id === actionId);

              update("actionId", actionId);
              update("actionLabel", selected?.label || "");
              update("params", {});
            }}
            style={inputStyle}
          >
            <option value="">Select an action</option>
            {automations.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>

          {/* Render parameters */}
          {node.data.actionId &&
            automations
              .find((a) => a.id === node.data.actionId)
              ?.params.map((paramKey) => (
                <div key={paramKey}>
                  <Label>{paramKey}</Label>
                  <Input
                    value={node.data.params?.[paramKey] || ""}
                    onChange={(e) =>
                      update("params", {
                        ...node.data.params,
                        [paramKey]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
        </>
      )}

      {/* END NODE */}
      {node.type === "end" && (
        <>
          <Label>End message</Label>
          <Input
            value={node.data.message || ""}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Ex: Process Completed"
          />

          <Label>Summary flag</Label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={!!node.data.summary}
              onChange={(e) => update("summary", e.target.checked)}
            />
            <span style={{ fontSize: 13 }}>Generate summary at end</span>
          </div>
        </>
      )}
    </div>
  );
}

const panelStyle = {
  width: 320,
  borderLeft: "1px solid #e5e7eb",
  padding: 16,
  background: "#f9fafb",
  overflowY: "auto",
};

const inputStyle = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  marginTop: 4,
  marginBottom: 8,
  fontSize: 13,
};

const Input = (props) => <input {...props} style={inputStyle} />;

const Label = ({ children }) => (
  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>{children}</div>
);

const textAreaStyle = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  height: 60,
  resize: "vertical",
  marginBottom: 8,
};
