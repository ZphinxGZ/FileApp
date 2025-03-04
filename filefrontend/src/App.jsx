import { useState } from "react";
import "./App.css";
import Download from "./Component/Download/Download";
import Upload from "./Component/Upload/Upload";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  return (
    <div>
      <Download refreshTrigger={refreshTrigger} />
      <Upload setRefreshTrigger={setRefreshTrigger} />
      <h2>Kunakorn Khamcharoen 66075070</h2>
    </div>
    
  );
}

export default App;
