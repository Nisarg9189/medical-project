module.exports.isLoggedIn = (req, res, next) => {
  if(req.session.user) {
    // console.log("User is logged in:", req.session.user);
    res.locals.user = req.session.user; // make user info available in response
    next();
  } else {
    console.log("Unauthorized access attempt");
    res.status(401).json({message: "Unauthorized access", ok: false });
  }
}