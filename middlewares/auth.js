const { getUser } = require("../utils/auth");

function checkForAuthentication(req,res,next){
    // console.log(req)
    let token = req?.cookies?.token;;
    if(!token){
        // req.user = null
        return next()
    }
    req.user = getUser(token)
    return next()
}

function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect("/login");
  }

  const user = getUser(token);
  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}

module.exports = {
  requireAuth,
  checkForAuthentication
};