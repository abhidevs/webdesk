const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You're not allowed to do this!");
  }
}

module.exports = verify;
