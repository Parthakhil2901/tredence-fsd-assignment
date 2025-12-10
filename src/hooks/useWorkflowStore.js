import { create } from "zustand";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";

// Default node data per type
const createDefaultData = (type) => {
  switch (type) {
    case "start":
      return {
        title: "Start Workflow",
        metadata: [{ key: "department", value: "HR" }],
      };
    case "task":
      return {
        title: "New Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: [],
      };
    case "approval":
      return {
        title: "Approval Step",
        approverRole: "Manager",
        autoApproveThreshold: 0,
      };
    case "auto":
      return {
        title: "Automation",
        actionId: "",
        actionLabel: "",
        params: {},
      };
    case "end":
      return {
        message: "Workflow Completed",
        summary: true,
      };
    default:
      return {};
  }
};

export const useWorkflowStore = create((set) => ({
  // Initial nodes
  nodes: [
    {
      id: "start-1",
      type: "start",
      position: { x: 150, y: 150 },
      data: createDefaultData("start"),
    },
    {
      id: "end-1",
      type: "end",
      position: { x: 600, y: 150 },
      data: createDefaultData("end"),
    },
  ],

  edges: [],

  selectedNodeId: null,

  // SET SELECTED NODE
  setSelectedNode: (id) => set({ selectedNodeId: id }),

  // REACT FLOW HANDLERS
  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection, animated: true }, state.edges),
    })),

  // ADD NODE
  addNodeAtPosition: (type, position) =>
    set((state) => {
      if (type === "start" && state.nodes.some((n) => n.type === "start")) {
        alert("Only one Start node allowed.");
        return {}; // Prevent recursion
      }

      const id = `${type}-${Date.now()}`;
      const newNode = {
        id,
        type,
        position,
        data: createDefaultData(type),
      };

      return { nodes: [...state.nodes, newNode] };
    }),

  // UPDATE NODE'S DATA
  updateNodeData: (id, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    })),
}));
