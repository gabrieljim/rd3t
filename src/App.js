import "./App.css";
import ReactD3T, { treeData } from "./ReactD3T";

function App() {
  return (
    <div className="App">
      <main className="Main">
        <ReactD3T data={treeData} />
      </main>
    </div>
  );
}

export default App;
