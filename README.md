# 🧩 Tredence Full-Stack Developer Internship – Workflow Builder Assignment

### 🔗 **Live Demo:**  
https://tredence-fsd-intern-assignment-kpaa3tq7h.vercel.app  

### 🔗 **GitHub Repository:**  
https://github.com/Parthakhil2901/tredence-fsd-assignment  

---

## 📌 Overview

This project is a **drag-and-drop Workflow Builder** built using **React, ReactFlow, Zustand, and Vite**.

The application allows users to visually construct workflows by:

- Creating workflow nodes (Start, Task, Approval, Automated Step, End)  
- Dragging and dropping nodes onto a canvas  
- Connecting nodes to define workflow paths  
- Configuring each node with dynamic metadata  
- Running full workflow simulation with step-by-step logs  
- Validating workflow structure and detecting errors  

This assignment demonstrates strong skills in **frontend engineering**, **state management**, **UI/UX design**, and **problem-solving**.

---

## 🚀 Features

### 🎨 Visual Workflow Canvas
- Drag-and-drop interface powered by ReactFlow  
- Zoom, pan, edge creation, and minimap support  
- Clean, professional node designs for readability  

### 🔧 Node Types Implemented
- **Start Node** – Entry point of the workflow  
- **Task Node** – Manual task with assignee, description, and deadlines  
- **Approval Node** – Role-based approval with thresholds  
- **Automated Step Node** – Linked to automation actions with dynamic parameters  
- **End Node** – Final step with summary options  

### 📝 Dynamic Node Configuration Panel
- Updates instantly when a node is selected  
- Adaptive form UI based on node type  
- Handles editable metadata, custom fields, automation parameters, and more  

### 🧪 Workflow Simulation Engine
- Sends workflow JSON to mock `/simulate` API  
- Performs validation  
- Generates ordered step execution logs  
- Displays detailed success/error status for each step  

### ⚡ State Management with Zustand
- Optimized selectors  
- No unnecessary rerenders  
- Pure, predictable state transitions  

---

## 🧠 Notable Bug Fix – Infinite Render Loop

During development, ReactFlow repeatedly threw:

> **Error: Maximum update depth exceeded**

The root causes were:

- `nodeTypes` being recreated on every render  
- Zustand selectors triggering unnecessary state reads  
- Node selection updating state during render cycle  

### ✔ How I solved it

- Moved `nodeTypes` outside of the component scope  
- Added stable selectors to avoid uncontrolled updates  
- Ensured `selectNode()` does not update the store during ReactFlow events  
- Eliminated cyclic state updates inside React hooks  

**Result:**  
The canvas became stable, performance improved significantly, and the entire UI rendered without recursive update issues.

---

## 📂 Project Structure

src/
├── api/
│ ├── automations.js # Mock automation list
│ └── simulate.js # Mock workflow simulation API
│
├── components/
│ ├── Canvas.jsx # Main ReactFlow canvas
│ ├── NodeConfigPanel.jsx # Right panel for node editing
│ ├── Sidebar.jsx # Left panel node palette
│ └── SimulationPanel.jsx # Bottom panel for simulation logs
│
├── hooks/
│ └── useWorkflowStore.js # Zustand store for workflow state
│
├── nodes/
│ ├── StartNode.jsx
│ ├── TaskNode.jsx
│ ├── ApprovalNode.jsx
│ ├── AutoNode.jsx
│ ├── EndNode.jsx
│ └── nodeTypes.js # Mapping node types → components
│
├── App.jsx # Main layout
└── main.jsx # Entry file for Vite




---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React (Vite) |
| Canvas Engine | ReactFlow |
| State Management | Zustand |
| API Mocking | Local JSON + simulate endpoint |
| Deployment | Vercel |
| Styling | Custom CSS + inline styles |

---

## 👨‍💻 Author

**Akhilesh Shukla (Parth)**  
B.Tech CSE – SRM Institute of Science and Technology  

🔗 GitHub: https://github.com/Parthakhil2901  
🔗 LinkedIn: linkedin.com/in/akhilesh-shukla-5b7283248

---

## 🌟 Conclusion

This project showcases the ability to:

- Architect scalable React applications  
- Work with component-driven UI systems  
- Handle complex state management patterns  
- Debug production-level frontend issues  
- Create clean, maintainable, user-friendly interfaces  

Thank you for reviewing my submission!

