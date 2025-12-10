import { useState } from "react";
import { useWorkflowStore } from "../hooks/useWorkflowStore";
import { simulateWorkflow } from "../api/simulate";

// Style constants for maintainability
const STYLES = {
  container: {
    padding: 10,
    borderTop: "1px solid #e5e7eb",
    background: "white",
    fontSize: 12,
  },
  buttonGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  button: {
    padding: "6px 10px",
    borderRadius: 4,
    border: "none",
    background: "#2563eb",
    color: "white",
    fontSize: 13,
    cursor: "pointer",
  },
  buttonDisabled: {
    background: "#9ca3af",
    cursor: "not-allowed",
  },
  helpText: {
    color: "#6b7280",
  },
  errorContainer: {
    marginTop: 8,
    padding: 8,
    borderRadius: 4,
    background: "#fef2f2",
    border: "1px solid #fecaca",
  },
  logContainer: {
    marginTop: 8,
    maxHeight: 150,
    overflowY: "auto",
    borderTop: "1px dashed #e5e7eb",
  },
  logItem: {
    padding: 6,
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px dashed #e5e7eb",
  },
  statusOk: { color: "#16a34a", fontWeight: 600 },
  statusError: { color: "#b91c1c", fontWeight: 600 },
  emptyState: { color: "#9ca3af", fontStyle: "italic", padding: 8 },
};

export default function SimulationPanel() {
  // ✅ FIX: use separate selectors so Zustand doesn’t infinite-loop
  const nodes = useWorkflowStore((s) => s.nodes);
  const edges = useWorkflowStore((s) => s.edges);

  const [log, setLog] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const isWorkflowValid = nodes.length > 0 && edges.length >= 0;

  const runSimulation = async () => {
    try {
      setLoading(true);
      setApiError(null);
      setErrors([]);
      setLog([]);

      const result = await simulateWorkflow({ nodes, edges });

      setErrors(result.errors || []);
      setLog(result.steps || []);
    } catch (error) {
      setApiError(error.message || "Failed to run simulation");
      console.error("Simulation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={STYLES.container}>
      {/* Control Section */}
      <div style={STYLES.buttonGroup}>
        <button
          onClick={runSimulation}
          disabled={loading || !isWorkflowValid}
          style={{
            ...STYLES.button,
            ...(loading || !isWorkflowValid ? STYLES.buttonDisabled : {}),
          }}
          aria-busy={loading}
          aria-label="Run workflow simulation"
        >
          {loading ? "Simulating..." : "Run Simulation"}
        </button>
        <span style={STYLES.helpText}>
          Sends workflow JSON to mock /simulate API.
        </span>
      </div>

      {/* Validation Warning */}
      {!isWorkflowValid && (
        <div style={STYLES.errorContainer}>
          <strong>⚠️ Workflow Setup Required</strong>
          <p style={{ margin: "4px 0 0 0" }}>
            Please create at least one node before running simulation.
          </p>
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div style={STYLES.errorContainer}>
          <strong>❌ API Error:</strong>
          <p style={{ margin: "4px 0 0 0" }}>{apiError}</p>
        </div>
      )}

      {/* Validation Errors */}
      {errors.length > 0 && (
        <div style={STYLES.errorContainer}>
          <strong>🔴 Validation Errors:</strong>
          <ul style={{ margin: "4px 0 0 0", paddingLeft: 20 }}>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Execution Log */}
      {log.length > 0 ? (
        <div
          style={STYLES.logContainer}
          role="region"
          aria-label="Simulation log"
        >
          {log.map((step) => (
            <div key={step.id} style={STYLES.logItem}>
              <span>
                {step.index}. {step.label} ({step.type})
              </span>
              <span
                style={
                  step.status === "ok" ? STYLES.statusOk : STYLES.statusError
                }
              >
                {step.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        (nodes.length > 0 || errors.length > 0) && (
          <div style={STYLES.emptyState}>
            Run simulation to see execution log...
          </div>
        )
      )}
    </div>
  );
}
