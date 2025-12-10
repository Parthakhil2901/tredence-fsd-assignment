import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import NodeConfigPanel from "./components/NodeConfigPanel";
import SimulationPanel from "./components/SimulationPanel";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "system-ui",
        background: "#f3f4f6",
      }}
    >
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* CANVAS + CONFIG PANEL */}
        <div style={{ flex: 1, display: "flex" }}>
          <Canvas />
          <NodeConfigPanel />
        </div>

        {/* SIMULATION PANEL */}
        <SimulationPanel />
      </div>
    </div>
  );
}

export default App;
