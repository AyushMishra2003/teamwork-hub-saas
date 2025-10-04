import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Landing from "./page/Landing";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Loading from "./page/Loading";

const App = () => {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
