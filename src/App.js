import React, { useEffect, useState } from "react";
import MainApp from "components/mainComp";
import NavBar from "scenes/navbar";
import LoginPage from "components/loginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    const storedCredentials = localStorage.getItem("credentials");
    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
      setIsLoggedIn(true);
    }
  }, [credentials]);

  const handleLogin = (username, password) => {
    if (username === "user1" && password === "password1") {
      const credentials = { username, password };
      localStorage.setItem("credentials", JSON.stringify(credentials));
      setIsLoggedIn(true);
      setCredentials(credentials);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("credentials");
    setIsLoggedIn(false);
    setCredentials(null);
  };

  return (
    <div className="mx-auto w-5/6">
      {isLoggedIn && <NavBar onLogout={handleLogout} />}
      {isLoggedIn ? <MainApp /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
}

export default App;
