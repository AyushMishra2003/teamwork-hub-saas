import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignUp = ({ setUser }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
   
        console.log("Google token response:", tokenResponse);
        
        
        // Send the access token to backend
        const backendResp = await axios.post(
          "http://localhost:5000/signup",
          {
            token: tokenResponse.access_token, // send only token
          },
          { withCredentials: true }
        );

        // Set user in frontend state
        setUser(backendResp.data.user);

        // Store your app JWT
        localStorage.setItem("app_token", backendResp.data.user.token);

        // Redirect
        navigate("/");
      } catch (err) {
        console.error("Google login error:", err.response ?? err.message);
        alert("Login failed, check console.");
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
    scope: "openid email profile",
  });


  return (
    <>
      <nav style={{ padding: "2rem" }}>
        <Link to="/">Go Back</Link>
      </nav>
      <header style={{ textAlign: "center" }}>
        <h1>Register to continue</h1>
      </header>
      <main style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <button
          onClick={() => login()}
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>
      </main>
    </>
  );
};

export default SignUp;
