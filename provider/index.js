const express = require("express");

const app = express();

const port = 3001;

app.get("/list", (req, res) => {
  res.send(`hello world ${port}`);
});

app.listen(port, () => {
  console.log(`App listinging to port ${port}`);
});
