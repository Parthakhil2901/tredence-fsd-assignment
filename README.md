🧩 Tredence Full-Stack Developer Internship – Workflow Builder Assignment
🔗 Live Demo:

https://tredence-fsd-intern-assignment-kpaa3tq7h.vercel.app

🔗 GitHub Repo:

https://github.com/Parthakhil2901/tredence-fsd-assignment

📌 Overview

This project is a drag-and-drop Workflow Builder built using React, ReactFlow, Zustand, and Vite.
The tool enables users to:

Create workflow nodes (Start, Task, Approval, Automated Step, End)

Drag & drop them on a visual canvas

Connect nodes to define workflow paths

Configure each node with dynamic metadata

Simulate workflow execution via a mock API

Validate and display execution logs in real time

This demonstrates strong skills in frontend engineering, state management, UI/UX, and problem solving.

🚀 Features
✔ Drag-and-Drop Canvas

Built with ReactFlow — supports adding, positioning, editing, and linking nodes.

✔ Node Types Implemented

Start Node

Task Node

Approval Node

Automated Step (fetches mock actions dynamically)

End Node

✔ Node Configuration Panel

Dynamic UI updates based on the selected node type.

✔ Workflow Simulation

Runs /simulate API with:

Ordered execution

Error checks

Step-by-step result logs

✔ State Management

Powered by Zustand with selectors to prevent rerender loops.

✔ Fully Deployable

Hosted on Vercel with automatic builds using Vite.

🛠️ Tech Stack
Area	Technology
Frontend Framework	React (Vite)
Canvas Engine	ReactFlow
State Management	Zustand
Deployment	Vercel
UI	Custom Components + ReactFlow Defaults
API Mocking	Local static JSON + mock simulate API
🧠 Tricky Frontend Bug I Solved

Infinite render loop in ReactFlow + Zustand integration
I initially ran into a “Maximum update depth exceeded” error caused by:

Passing newly created nodeTypes on every render

Calling selection logic that triggered multiple store updates

Using deep selectors without memoization

Fix:
I stabilized all selectors, moved nodeTypes outside the component, and ensured store functions don’t trigger recursive updates. This removed render loops and made the UI stable even with many nodes.

📂 Folder Structure
src/
 ├── api/
 │   ├── automations.js
 │   └── simulate.js
 ├── components/
 │   ├── Canvas.jsx
 │   ├── NodeConfigPanel.jsx
 │   ├── Sidebar.jsx
 │   └── SimulationPanel.jsx
 ├── hooks/
 │   └── useWorkflowStore.js
 ├── nodes/
 │   ├── StartNode.jsx
 │   ├── TaskNode.jsx
 │   ├── ApprovalNode.jsx
 │   ├── AutoNode.jsx
 │   ├── EndNode.jsx
 │   └── nodeTypes.js
 ├── App.jsx
 ├── main.jsx

📸 Screenshots
<img width="1365" height="679" alt="Screenshot 2025-12-11 031436" src="https://github.com/user-attachments/assets/00491bd1-9b73-4529-a145-dacb34d9e60c" />
<img width="1365" height="687" alt="Screenshot 2025-12-11 032054" src="https://github.com/user-attachments/assets/7f55d87c-9c9a-4fb5-81b1-e8f56fceecbe" />

<img width="1365" height="687" alt="Screenshot 2025-12-11 032431" src="https://github.com/user-attachments/assets/403c88e1-f447-45bf-90b1-cf291e8bb3bb" />

📬 Contact

Akhilesh Shukla (Parth)
B.Tech CSE, SRMIST
LinkedIn:linkedin.com/in/akhilesh-shukla-5b7283248
GitHub: https://github.com/Parthakhil2901
