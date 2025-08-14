const express = require("express");
const app = express();
const port = 7777;

app.get("/api/clients", (req, res) => {
  const clients = [
    { id: 1, name: "田中" },
    { id: 2, name: "佐藤" },
  ];
  res.json(clients);
});

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動中です！`);
});
