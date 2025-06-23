const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/quote", async (req, res) => {
  try {
    const r = await fetch("https://api.geliver.com/api/orders/price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const json = await r.json();
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: "Quote hatası", details: err.toString() });
  }
});

app.post("/order", async (req, res) => {
  try {
    const r = await fetch("https://api.geliver.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const json = await r.json();
    res.json(json);
  } catch (err) {
    res.status(500).json({ error: "Order hatası", details: err.toString() });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy sunucu ${port} portunda çalışıyor`);
});
