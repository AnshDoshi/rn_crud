const express = require("express");
// const list = require("./list");
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

const run = async () => {
  // const user = new User({ name: "harsh", age: 21 });
  // await user.save();
  const user = await User.find().sort({ _id: -1 });
  console.log(user);
};
// run();

const app = express();

let list = [];

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());
// app.use(express.urlencoded());

const port = 3001;

app.get("/list", async (req, res) => {
  const allUser = await User.find().sort({ _id: -1 });
  // console.log(allUser);
  res.send(allUser);
});

app.post("/list", async (req, res) => {
  console.log(req.body, "req");
  const user = await User.create({
    ...req.body,
    title: `${req.body.name}'s title`,
  });
  // console.log(user, "user");
  // list = await User.find();
  res.send(user);
});

app.put("/lists/:id", async (req, res) => {
  console.log(req.params.id);
  const findUser = await User.findById(req.params.id);
  const updatedUser = await User.updateOne(
    { _id: req.params.id },
    { isDone: !findUser.isDone }
  );
  console.log(updatedUser, "findUser");
  res.send({ message: "user updated", status: updatedUser.acknowledged });
});

app.delete("/lists/:id", async (req, res) => {
  // console.log({ req: req.params.id }, "DELETE CALLED");
  const deletedUser = await User.find({ _id: req.params.id });
  if (deletedUser) {
    await User.findByIdAndDelete(req.params.id);
    res.send({
      message: `${deletedUser[0].name} removed successfully`,
      status: true,
    });
  }
  // console.log({ message: `${deletedUser[0].name} removed successfully` });
  // const allUser = await User.find();
});

app.listen(port, () => {
  console.log(`App listinging to port ${port}`);
});
