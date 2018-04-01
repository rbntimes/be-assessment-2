const ipinfo = require('ipinfo');
const bcrypt = require('bcrypt');

module.exports = function(user, cb) {
  loc = '';
  ipinfo((err, info) => {
    return done(info);
  });

  function done({ loc }) {
    let { username, password } = user;
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) return next(err);
        user = {
          username,
          password: hash,
          location: {
            type: 'Point',
            coordinates: [Number(loc.split(',')[0]), Number(loc.split(',')[1])],
          },
          prefers: 'female',
          maxRange: '100000',
          minAge: 18,
          maxAge: 50,
        };
        klaar(user);
      });
    });
  }

  function klaar(user) {
    return cb(user);
  }
};
