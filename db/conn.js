/** @format */

const mongoose = require("mongoose");
// connect data base

mongoose
  .connect(
    // "mongodb+srv://harshtripathi:tripathi@cluster0.oj42lv9.mongodb.net/?retryWrites=true&w=majority",
    "mongodb+srv://harsh:Harsh%401234@cluster0.aotowq3.mongodb.net/solar_tec?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log(e);
  });
