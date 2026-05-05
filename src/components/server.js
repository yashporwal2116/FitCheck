const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Server working");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});