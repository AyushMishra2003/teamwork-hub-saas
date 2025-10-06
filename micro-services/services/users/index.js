import express from "express";
import ConnectionToDB from "./config/dbConnection.js";
import dotenv from 'dotenv'

const app = express();
app.use(express.json());


dotenv.config()


let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

// GET all users
app.get("/users", (req, res) => res.json(users));

// POST create new user
app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});



const PORT = 3001;

// Server start only after DB connection
const startServer = async () => {
  try {
    console.log("call or not");
    
    await ConnectionToDB(); // MongoDB connect
    app.listen(PORT, () => {
      console.log(`👤 Users service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1); // exit if DB not connected
  }
};

// call start
startServer();


