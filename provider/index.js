const express = require("express");
const list = require("./list");

const app = express();

const port = 3001;

app.get("/list", (req, res) => {
  res.send(list);
});

app.listen(port, () => {
  console.log(`App listinging to port ${port}`);
});
