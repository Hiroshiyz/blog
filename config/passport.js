const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models").user;

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;
  passport.use(
    //playload (message)
    new Strategy(opts, async function (jwt_playload, done) {
      try {
        let foundUser = await User.findOne({ _id: jwt_playload._id }).exec();
        if (foundUser) {
          return done(null, foundUser); //req.user = found.user
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
