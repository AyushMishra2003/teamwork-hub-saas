import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// /users -> users service
app.use("/users", createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true
}));

// /orders -> orders service
app.use("/orders", createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true
}));

app.listen(8080, () => console.log("🚀 API Gateway running on port 8080"));
