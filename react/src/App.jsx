import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const login =  (e) => {
    e.preventDefault();
    setIsLoading(true);
   console.log(import.meta.env.VITE_API_BASE_URL)
  };

  return (
    <div className="App">
      <h2>Log In</h2>
      <form action="" onSubmit={(e) => login(e)}>
        <input
          placeholder="Username"
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default App;
