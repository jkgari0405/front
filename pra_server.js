// const express = require("express");
// const app = express();
// const port = 7777;

const express = require("express");
const app = express();
const port = 7777;

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動中です！`);
});

app.get("/", (req, res) => {
  res.send("APIサーバーが稼働中です");
});

app.use(express.json());

app.post("/api/clients", (req, res) => {
  const clientName = req.body.clientName;
  console.log("受け取った取引先名:", clientName);
  res.json({ message: "取引先登録が完了しました", clientName });
});
