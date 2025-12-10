const nodePalette = [
  { type: "start", label: "Start Node" },
  { type: "task", label: "Task Node" },
  { type: "approval", label: "Approval Node" },
  { type: "auto", label: "Automated Step" },
  { type: "end", label: "End Node" },
];

export default function Sidebar() {
  const onDragStart = (event, type) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        width: 220,
        padding: 16,
        borderRight: "1px solid #e5e7eb",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <h3 style={{ marginBottom: 8 }}>Node Types</h3>

      {nodePalette.map((n) => (
        <div
          key={n.type}
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
          style={{
            padding: 8,
            borderRadius: 6,
            border: "1px dashed #9ca3af",
            background: "white",
            fontSize: 14,
            cursor: "grab",
          }}
        >
          {n.label}
        </div>
      ))}

      <p style={{ fontSize: 12, marginTop: 16, color: "#6b7280" }}>
        Drag a node onto the canvas.
      </p>
    </div>
  );
}
