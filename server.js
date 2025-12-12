const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Forward prediction request to FastAPI model server
app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:8000/predict", req.body);
    res.json(response.data);
  } catch (err) {
    console.error("Prediction error:", err.toString());
    res.status(500).json({ error: "Prediction service failed" });
  }
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
