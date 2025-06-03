const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models").user;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
module.exports = (passport) => {
  //jwt 驗證
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;
  passport.use(
    //playload (message)
    new JwtStrategy(opts, async function (jwt_playload, done) {
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
  //google驗證
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/auth/google/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let foundUser = await User.findOne({ googleID: profile.id }).exec();
          if (foundUser) {
            console.log("已經註冊過無須存入");

            done(null, foundUser);
          } else {
            console.log("新用戶儲存資料");
            let newUser = new User({
              name: profile.displayName,
              googleID: profile.id,
              email: profile.emails[0].value,
            });
            let saveUser = await newUser.save();

            done(null, saveUser);
          }
        } catch (e) {
          return done(e, false);
        }
      }
    )
  );
};
