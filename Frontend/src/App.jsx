import { useEffect, useState } from "react";

function App() {
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/health")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setHealthData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Test frontend-backend connection</h1>
      {error && <p>Error: {error}</p>}
      {healthData ? <pre>{JSON.stringify(healthData, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;