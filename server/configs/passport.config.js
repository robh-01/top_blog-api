import passport from "passport";

import pkg from "passport-jwt";
const { Strategy, ExtractJwt } = pkg;
const JwtStrategy = Strategy;
const opts = {};

import dotenv from "dotenv";
dotenv.config();
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;

import { getUserById } from "../db/userQueries.js";

function configPassport() {
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        const user = await getUserById(payload.sub);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
}

export { configPassport };
