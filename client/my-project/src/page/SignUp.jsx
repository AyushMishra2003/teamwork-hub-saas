import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignUp = ({ setUser }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // tokenResponse contains access_token (and sometimes other fields)
      // We'll request the ID token by calling Google's tokeninfo? 
      // BUT @react-oauth/google gives us access_token; best approach: call Google's userinfo endpoint
      try {
        // 1) Get user info from Google using access_token
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const googleUser = res.data; // contains sub, email, name, picture, etc.
        // 2) Send this id info (or the access_token) to your backend for verification/creation
        // better: send the access_token to backend and backend will verify with Google
        const backendResp = await axios.post("http://localhost:5152/signup", {
          token: tokenResponse.access_token, // send access token
          user: googleUser,
        }, { withCredentials: true });

        // backendResp.data should contain your app's user info and maybe app JWT
        setUser(backendResp.data.user);
        // optionally store app JWT in localStorage (be careful)
        if (backendResp.data.token) {
          localStorage.setItem("app_token", backendResp.data.token);
        }
        navigate("/"); // go to landing or dashboard
      } catch (err) {
        console.error("Signup error:", err.response ?? err.message);
        alert("Signup failed, check console.");
      }
    },
    onError: () => {
      console.error("Login Failed");
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
