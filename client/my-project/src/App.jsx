import React, { useState, useEffect } from "react";
import LoginPage from "./page/Login";
import Home from "./page/Home";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (email) => {
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <Home user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
