const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const PYTHON_URL = process.env.PYTHON_URL;




// Forward prediction request to FastAPI model server
app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(`${PYTHON_URL}/predict`, req.body);;
    res.json(response.data);
  } catch (err) {
    console.error("Prediction error:", err.toString());
    res.status(500).json({ error: "Prediction service failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
