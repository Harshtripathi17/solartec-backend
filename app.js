/** @format */

const express = require("express");
const app = express();
require("./db/conn");

//............. link the router to make easy routing..........//
app.use(require("./routers/auth"));

// ...........middleware.............//
// const middleware = (req, res, next) => {
//     console.log("it is a middleware");
//     next();
// }
// .............port..............//
app.listen(5000, () => {
  console.log("port no. 5000");
});
