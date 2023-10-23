import React, { useState } from "react";
import Logo from "assets/Logo.svg";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <div className="mx-auto flex h-90v w-1/2 justify-center py-8">
      <div className="flex w-2/3 flex-col items-center justify-center">
        <img alt="Logo" src={Logo} className="mb-4" />
        <div className="w-full">
          <input
            className="text-gray-50 mb-4 block w-full rounded-2xl border border-gray bg-background p-4 text-sm"
            style={{ outline: "none", boxShadow: "none" }}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="w-full">
          <input
            className="text-gray-50 mb-4 block w-full rounded-2xl border border-gray bg-background p-4 text-sm"
            style={{ outline: "none", boxShadow: "none" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="m-4 flex w-full justify-center rounded-lg bg-primary py-2 text-secondary "
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
