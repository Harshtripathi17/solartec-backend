// const jwt = require('jsonwebtoken');
// const User = require("../models/userSchema")
// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwt;
//     const verifyToken = jwt.verify(token, "mynameisaarti");
//     const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })
//     if (rootUser) {
//      req.token=token;
//      req.rootUser=rootUser;
//      req.UserID=rootUser._id;
//     } else {
//       res.send("user not found");

//     }
//     next();
//   } catch (error) {
//     res.send("no token provided");
//     console.log(err);
//   }
// }
// module.exports = authenticate;