const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./User");

mongoose.connect(
  "mongodb://localhost/test",
  () => {
    console.log("success");
  },
  (e) => {
    console.error("e", e);
  }
);

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const port = 3001;

app.get("/list", async (req, res) => {
  const allUser = await User.find().sort({ _id: -1 });
  res.send(allUser);
});

app.post("/list", async (req, res) => {
  console.log(req.body, "req");
  const user = await User.create({
    ...req.body,
    title: `${req?.body?.name}'s title`,
  });
  // console.log(user);
  res.send(user);
});

app.put("/list/:id", async (req, res) => {
  console.log(req.params.id);
  const findUser = await User.findById(req.params.id);
  const updatedUser = await User.updateOne(
    { _id: req.params.id },
    { isDone: !findUser.isDone }
  );
  console.log(updatedUser, "findUser");
  res.send({ message: "user updated", status: updatedUser.acknowledged });
});

app.delete("/list/:id", async (req, res) => {
  // console.log({ req: req.params.id }, "DELETE CALLED");
  const deletedUser = await User.find({ _id: req.params.id });
  if (deletedUser) {
    await User.findByIdAndDelete(req.params.id);
    res.send({
      message: `${deletedUser[0].name} removed successfully`,
      status: true,
    });
  }
});

app.listen(port, () => {
  console.log(`App listinging to port ${port}`);
});

// app.use(express.urlencoded());
