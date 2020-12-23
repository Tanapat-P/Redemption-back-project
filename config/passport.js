const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../models');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtStrategyUser = new Strategy(options, async (payload, done) => {
  const targetUser = await db.User.findOne({ where: { id: payload.id } });

  if (targetUser) {
    done(null, targetUser); // Assign <<<req.user = targetUser>>>
  } else {
    done(null, false);
  }
});

const jwtStrategyAdmin = new Strategy(options, async (payload, done) => {
  const targetAdmin = await db.Admin.findOne({ where: { id: payload.id } });

  if (targetAdmin) {
    done(null, targetAdmin);
  } else {
    done(null, false);
  }
});

passport.use('jwt-user', jwtStrategyUser);
passport.use('jwt-admin', jwtStrategyAdmin);
