const jwt = require('jsonwebtoken');
const db = require("../models");
// const User = db.user;

// exports.requiresignin=(req,res,next)=>{
//     if(req.headers.authorization){
//         const token = req.headers.authorization.split(" ")[1];
//         const user= jwt.verify(token,"secret");
//         req.user=user;
        
//     }else
//     {return res.status(400).json({ message:"authorization is required"})}
//     next();
// }

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};



isUsers = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "user") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require users Role!"
        });
      });
    });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isUsers: isUsers,
  };
  module.exports = authJwt;