/** @format */

const express = require("express");
const app = express();
require("./db/conn");
require("dotenv").config();

//............. link the router to make easy routing..........//
app.use(require("./routers/auth"));

// ...........middleware.............//
// const middleware = (req, res, next) => {
//     console.log("it is a middleware");
//     next();
// }
// .............port..............//
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`port no. ${port}`);
});
