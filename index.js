/* eslint-disable semi */

const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const haversine = require('haversine');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

require('dotenv').config();

const { authentication } = require('./utils/error');
const createUser = require('./utils/createUser');

let db = null;
const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, function(err, client) {
  if (err) {
    throw err;
  }

  db = client.db(process.env.DB_NAME);
});

passport.use(
  new Strategy(function(username, password, cb) {
    db
      .collection('users')
      .findOne({ username })
      .then(function(user) {
        if (!user) {
          return cb(404, false);
        }
        bcrypt.compare(password, user.password, function(err, res) {
          if (err) return cb(err);
          if (res === false) {
            return cb(401, false);
          } else {
            return cb(null, user);
          }
        });
      });
  })
);

// Serialize and deserialize user when setting/getting info from session cookie
// https://stackoverflow.com/a/28693104

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  db
    .collection('users')
    .findOne({ _id: ObjectId(id) })
    .then(function(user) {
      if (!user) {
        return cb('not found');
      }
      cb(null, user);
    });
});

express()
  .use(express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(require('morgan')('combined'))
  .use(require('cookie-parser')())
  .use(require('body-parser').urlencoded({ extended: true }))
  .use(
    session({
      secret: process.env.MY_MOST_BELOVED_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        url: url,
      }),
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', matchList)
  .get('/nojs', matche)
  .get('/data', matche)
  .post('/', add)
  .post('/profile', updateProfile)
  .get('/questions', question)
  .get('/profile', profile)
  .get('/register', register)
  .get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  })
  .post('/login', function(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
      code = 400;
      res.status(code).render('login.ejs', {
        error: authentication[code],
        status: code,
      });
    } else {
      passport.authenticate('local', function(err, user) {
        req.logIn(user, () => {
          if (err) {
            res.status(err).render('login.ejs', {
              error: authentication.login[err],
              status: err,
            });
          } else {
            res.status(200).redirect('/');
          }
        });
      })(req, res, next);
    }
  })
  .post('/register', function(req, res, next) {
    let code = 200;
    const { username, password, passwordConf } = req.body;
    if (!username || !password || !passwordConf) {
      code = 400;
      res.status(code).render('register.ejs', {
        error: authentication[code],
        status: code,
      });
    }

    db
      .collection('users')
      .findOne({ username: username })
      .then(function(user) {
        if (user) {
          code = 409;
          res.status(code).render('register.ejs', {
            error: authentication.register[code],
            status: code,
          });
        } else if (password !== passwordConf) {
          code = 422;
          res.status(code).render('register.ejs', {
            error: authentication.register[code],
            status: code,
          });
        } else {
          createUser(req.body, done);

          function done(user) {
            db
              .collection('users')
              .insertOne(user)
              .then(function(user) {
                passport.authenticate('local', function(err, user) {
                  req.logIn(user, function(err) {
                    if (err) {
                      return res.status(err).redirect('/profile');
                    }
                    if (!err) {
                      res.status(201).redirect('/profile');
                    }
                  });
                })(req, res, next);
              });
          }
        }
      });
  })
  .get('/users/:id', match)
  .use(notFound)
  .listen(8000);

function matchList(req, res, next) {
  var user = req.user;

  res.render('endless.ejs', { user: user });
}

function matche(req, res, next) {
  if (req.user) {
    const { _id, prefers, maxAge, minAge, location, maxRange } = req.user;

    matches = [];
    var preferences = {
      _id: { $ne: _id },
      gender: prefers,
      age: { $lte: maxAge, $gte: minAge },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [location.coordinates[0], location.coordinates[1]],
          },
          $maxDistance: Number(maxRange),
        },
      },
    };
    db
      .collection('answers')
      .find({ user: _id })
      .toArray(function(err, data) {
        self = data;

        db
          .collection('users')
          .find(preferences)
          .count()
          .then(function(possibleMatchLength) {
            db
              .collection('users')
              .find(preferences)
              .forEach(function(user) {
                getUserData(user, self, possibleMatchLength);
              });
          });
      });

    function getUserData(user, self, possibleMatchLength) {
      db
        .collection('answers')
        .find({ user: user._id })
        .toArray(function(err, data) {
          goCompareShit(user, data, self, possibleMatchLength);
        });
    }

    function goCompareShit(user, data, self, possibleMatchLength) {
      var equalAnswers = self.filter(
        (val, index) => val.answer === data[index].answer
      );
      matches.push({
        id: user._id,
        name: user.name,
        age: user.age,
        match: Math.round(equalAnswers.length / self.length * 100) || 0,
        same: [equalAnswers.length, self.length],
        distance:
          Math.floor(
            haversine(
              {
                type: 'Point',
                geometry: {
                  coordinates: [
                    location.coordinates[0],
                    location.coordinates[1],
                  ],
                },
              },
              {
                type: 'Point',
                geometry: {
                  coordinates: [
                    user.location.coordinates[0],
                    user.location.coordinates[1],
                  ],
                },
              },
              { format: 'geojson' }
            )
          ) || 0,
      });

      if (matches.length === possibleMatchLength) {
        done(matches.sort((x, y) => y.match - x.match));
      }
    }

    function done(data) {
      if (req.route.path === '/nojs') {
        res.render('nojs.ejs', { data: data });
      } else {
        res.render('list.ejs', { data: data });
      }
    }
  } else {
    res.status(401).render('welcome.ejs');
  }
}

function match(req, res, next) {
  var id = req.params.id;

  db.collection('users').findOne(
    {
      _id: ObjectId(id),
    },
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('detail.ejs', { data: data });
    }
  }
}

function register(req, res, next) {
  if (!req.user) {
    res.render('register.ejs', { status: 200 });
  } else {
    res.redirect('/');
  }
}

function profile(req, res, next) {
  const user = req.user;

  if (user) {
    res.render('profile.ejs', user);
  } else {
    res.render('login.ejs', { status: 200 });
  }
}

function updateProfile(req, res, next) {
  const {
    min = req.user.min,
    max = req.user.max,
    prefers = req.user.prefers,
    maxRange = req.user.maxRange,
  } = req.body;

  db.collection('users').updateOne(
    { _id: req.user._id },
    {
      $set: {
        minAge: Number(min),
        maxAge: Number(max),
        prefers: prefers,
        maxRange: maxRange,
      },
    },
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.status(200).redirect('/profile');
    }
  }
}

function question(req, res) {
  const { _id } = req.user;
  db
    .collection('questions')
    .find()
    .toArray(function(err, data) {
      questions = data;
      db
        .collection('answers')
        .find({ user: ObjectId(_id) })
        .toArray(function(err, data) {
          done(err, questions, data);
        });
    });

  function done(err, questions, answered) {
    if (err) {
      next(err);
    } else {
      res.render('question.ejs', { data: questions[answered.length] });
    }
  }
}

function add(req, res, next) {
  const { _id } = req.user;

  db.collection('answers').insertOne(
    {
      user: _id,
      question: ObjectId(req.body.id),
      q: req.body.question,
      answer: req.body.answer,
    },
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect('/questions');
    }
  }
}

function notFound(req, res) {
  res.status(404).render('not-found.ejs');
}
