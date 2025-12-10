// Mock POST /simulate
export const simulateWorkflow = async (workflow) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const startCount = workflow.nodes.filter((n) => n.type === "start").length;
  const endCount = workflow.nodes.filter((n) => n.type === "end").length;

  const errors = [];

  // Basic workflow validation
  if (startCount !== 1) {
    errors.push(
      `Workflow must have exactly ONE start node (found ${startCount})`
    );
  }

  if (endCount < 1) {
    errors.push("Workflow must contain at least ONE end node.");
  }

  // step-by-step execution log
  const steps = workflow.nodes.map((node, index) => ({
    id: node.id,
    index: index + 1,
    type: node.type,
    label: node.data.title || node.data.message || node.type.toUpperCase(),
    status: errors.length ? "skipped" : "ok",
  }));

  return {
    errors,
    steps,
  };
};
