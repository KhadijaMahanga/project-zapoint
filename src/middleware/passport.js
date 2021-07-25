import crypto from "crypto";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "@/jikopoint/models/User";

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  return user.hash === inputHash;
}

passport.serializeUser((user, done) => {
  done(null, user.Id);
});

// passport#160
passport.deserializeUser((id, done) => {
  User.findById(id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

passport.use(
  new LocalStrategy({ passReqToCallback: true }, (username, password, done) => {
    const user = User.findOne({ username });
    if (user) {
      const inputHash = crypto
        .pbkdf2Sync(password, user.salt, 1000, 64, "sha512")
        .toString("hex");

      if (user.hash === inputHash) {
        return done(null, user);
      }
    }
    return done(null, false, { message: "Email or password is incorrect" });
  })
);

export default passport;
