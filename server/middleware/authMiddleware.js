import passport from "passport";

export const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "An error occurred during authentication. Please try again later.",
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