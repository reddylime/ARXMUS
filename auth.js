const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const userController = require('./controller/user');

const options = {};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userController.getUserById(id);
    done(null, user.dataValues);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new LocalStrategy(options, async (username, password, done) => {
  const user = await userController.getUserByUsername(username);

  try {
    if (!user) return done(null, false);
    if (password !== user.password) {
      return done(null, false);
    } else {
      return done(null, user);
    }
  } catch (error) {
    return done(err);
  }
}));
