const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const replicateToken = process.env.REPLICATE_API_TOKEN;

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend working");
});

// 🔥 REAL AI ROUTE
app.post("/generate", async (req, res) => {
  const { image, prompt } = req.body;

  if (!replicateToken) {
    return res.status(500).json({ error: "REPLICATE_API_TOKEN is not configured" });
  }

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${replicateToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "3b032a70c29aef7b9c3222f2e40b71660201d8c288336475ba326f3ca278a3e1",
        input: {
          prompt: prompt,
          image: image,
          strength: 0.7
        }
      })
    });

    const data = await response.json();

    console.log("Replicate response:", data); // debug

    res.json(data);

  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

// ✅ Dynamic port for deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
