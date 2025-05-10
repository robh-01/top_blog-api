import passport from "passport";

// check if valid user is logged in
export const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message:
          "An error occurred during authentication. Please try again later.",
      });
    }
    if (!user) {
      return res.status(401).json({
        status: "failure",
        message: "Invalid or expired token.",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

//check if the logged in user is an admin
export const authorizeAdmin = (req, res, next) => {
  if(!req.user || !req.user.isAuthor) {
    return res.status(403).json({
      status: "failure",
      message: "You are not authorized to perform this action.",
    });
  }
  next();
};
