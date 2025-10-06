import express from "express";

const app = express();
app.use(express.json());

let orders = [
  { id: 1, userId: 1, product: "Laptop" },
  { id: 2, userId: 2, product: "Phone" }
];

app.get("/orders", (req, res) => res.json(orders));

app.post("/orders", (req, res) => {
  const newOrder = { id: orders.length + 1, ...req.body };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.listen(3002, () => console.log("📦 Orders service running on 3002"));
