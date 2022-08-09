
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const newItems = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {

  const currentDay = date.getDate();
  res.render("list", {listTitle: currentDay, newListItems: newItems});

});

app.post("/", function(req, res) {

  const newItem = req.body.task;

  if (req.body.list === "Work") {
    workItems.push(newItem)
    res.redirect("/work");
  }
  else {
    newItems.push(newItem);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res) {
  const newItem = req.body.task;
  workItems.push(newItem);

  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function(){
  console.log("Server is running on Port 3000.");
});
