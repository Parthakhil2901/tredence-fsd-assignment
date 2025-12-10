// Mock GET /automations
export const getAutomations = async () => {
  // Simulate slight delay like a real API call
  await new Promise((resolve) => setTimeout(resolve, 200));

  return [
    {
      id: "send_email",
      label: "Send Email",
      params: ["to", "subject"],
    },
    {
      id: "generate_doc",
      label: "Generate Document",
      params: ["template", "recipient"],
    },
    {
      id: "create_ticket",
      label: "Create Helpdesk Ticket",
      params: ["priority", "category"],
    },
  ];
};
