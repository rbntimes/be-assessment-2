/* eslint-disable semi */

const { URL } = require('url');

const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const haversine = require('haversine');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const min = require('lodash/fp/min');
const { values, merge, keyBy } = require('lodash');
const moment = require('moment');
require('dotenv').config();

const getUserQuestions = require('./utils/getUserQuestions');
const getUserAnswers = require('./utils/getUserAnswers');
const { authentication, datafetch } = require('./utils/error');
const createUser = require('./utils/createUser');
const compareAnswers = require('./utils/compareAnswers');
const drawGoogleMaps = require('./utils/google-static-maps');

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
        return cb(null, false);
      }
      cb(null, user);
    });
});

app
  .use(express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(require('morgan')('combined'))
  .use(require('cookie-parser')())
  .use(require('body-parser').urlencoded({ extended: true }))
  .use(require('body-parser').json())
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
  .get('/', endless)
  .get('/nojs', getList)
  .get('/data', getList)
  .post('/', add)
  .post('/profile', updateProfile)
  .post('/addQuestion', addQuestion)
  .get('/questions', question)
  .get('/profile', profile)
  .get('/ownquestions', ownquestions)
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
  .get('/users/:id/questions', matchQuestions)
  .post('/users/:id/chat', chat)
  .get('/users/:id/match', message)
  .use(notFound);

io.on('connection', function(socket) {});

http.listen(3000, function() {});

function endless(req, res, next) {
  var user = req.user;

  res.render('endless.ejs', { user: user });
}

function getList(req, res, next) {
  if (req.user) {
    const {
      _id,
      prefers,
      maxAge,
      minAge,
      location,
      maxRange,
      questions = [],
    } = req.user;

    var map = drawGoogleMaps(
      req.user.location.coordinates[0],
      req.user.location.coordinates[1],
      req.user.maxRange,
      process.env.GOOGLE_MAPS_KEY
    );

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

    getUserAnswers(db, ObjectId(_id), function(ownAnswers) {
      db
        .collection('users')
        .find(preferences)
        .count()
        .then(function(possibleMatchLength) {
          if (possibleMatchLength === 0) {
            var code = 204;
            res.render('nomatches.ejs', {
              error: datafetch[code],
              status: code,
            });
          } else {
            db
              .collection('users')
              .find(preferences)
              .forEach(function(user) {
                getUserAnswers(db, ObjectId(user._id), function(userAnswers) {
                  goCompareThings(
                    user,
                    userAnswers,
                    ownAnswers,
                    possibleMatchLength
                  );
                });
              });
          }
        });
    });

    function goCompareThings(
      user,
      userAnswers,
      ownAnswers,
      possibleMatchLength
    ) {
      getUserQuestions(db, user._id, function(matchesQuestions) {
        compareAnswers(
          ownAnswers,
          userAnswers,
          matchesQuestions,
          questions,
          function(result) {
            match = result;

            matches.push({
              id: user._id,
              name: user.username,
              age: user.age,
              matchPercentage:
                Math.round(match.matching / ownAnswers.length * 100) || 0,
              same: [match.matching, ownAnswers.length],
              location: user.location.coordinates,
              match:
                match.ownQuestionsAnswered === questions.length &&
                match.matchingOwnQuestions / questions.length * 100 >= 50 &&
                match.matchingMatchesQuestions /
                  match.matchQuestionsAnswered *
                  100 >=
                  50,
              ownQuestionsAnswered:
                match.ownQuestionsAnswered > 0 && match.ownQuestionsAnswered,
              matchingOwnQuestions:
                match.matchingOwnQuestions > 0 && match.matchingOwnQuestions,
              completed:
                match.matchQuestions.length > 0 &&
                match.matchQuestions.length === match.matchQuestionsAnswered,
              unlocked:
                match.matchingMatchesQuestions /
                  match.matchQuestionsAnswered *
                  100 >=
                50,
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
              done(
                matches.sort((x, y) => y.matchPercentage - x.matchPercentage)
              );
            }
          }
        );
      });
    }

    function done(data) {
      if (req.route.path === '/nojs') {
        res.render('nojs.ejs', { data: data, map });
      } else {
        res.render('list.ejs', { data: data, map });
      }
    }
  } else {
    res.status(401).render('welcome.ejs');
  }
}

function match(req, res, next) {
  var id = req.params.id;

  db.collection('users').findOne({ _id: ObjectId(id) }, done);

  function done(err, user) {
    Object.assign(user, { questions: user.questions || [] });
    res.render('match.ejs', user);
  }

  // var id = req.params.id;
  // db.collection('users').findOne({ _id: ObjectId(id) }, done);
  //
  // function done(err, user) {
  //   getUserAnswers(db, ObjectId(id), function(userAnswers) {
  //     user.questions.forEach(q => {
  //       answered = find(userAnswers, a => {
  //         return a.questionId.toString() === q._id.toString();
  //       });
  //       console.log(user.questions, answered);
  //       Object.assign(user, {
  //         questions: user.questions || [],
  //         answered: [answered] || [],
  //       });
  //       res.render('match.ejs', user);
  //     });
  //   });
  // }
}

function message(req, res, next) {
  var id = req.params.id;
  var ownId = req.user._id;
  db.collection('users').findOne({ _id: ObjectId(id) }, getChat);
  function getChat(err, user) {
    db
      .collection('chats')
      .find({
        $or: [
          { from: ObjectId(id), to: ObjectId(ownId) },
          { to: ObjectId(id), from: ObjectId(ownId) },
        ],
      })
      .toArray(function(err, chat) {
        chat.forEach((m, index) => {
          chat[index]['send'] = moment(m.send)
            .startOf('minute')
            .fromNow();
        });
        done(user, chat);
      });
  }

  function done(user, chat) {
    res.render('message.ejs', {
      user,
      self: req.user,
      chat,
    });
  }
}

function chat(req, res, next) {
  var id = req.params.id;
  const { _id } = req.user;
  const date = new Date().toJSON();

  db
    .collection('chats')
    .insertOne({
      from: ObjectId(_id),
      to: ObjectId(id),
      message: req.body.message,
      send: date,
    })
    .then(function() {
      io.emit(id, {
        message: req.body.message,
        send: moment(date)
          .startOf('minute')
          .fromNow(),
        from: _id,
      });
      io.emit(_id, {
        message: req.body.message,
        send: moment(date)
          .startOf('minute')
          .fromNow(),
        from: _id,
      });

      res.status(201).redirect('back');
    });
}

function matchQuestions(req, res, next) {
  var id = req.params.id;
  const { _id, questions } = req.user;

  getUserAnswers(db, ObjectId(id), function(matchAnswers) {
    getUserAnswers(db, ObjectId(_id), function(ownAnswers) {
      getUserQuestions(db, ObjectId(id), function(matchesQuestions) {
        done(ownAnswers, matchAnswers, matchesQuestions);
      });
    });
  });

  function done(ownAnswers, matchesAnswers, matchesQuestions = []) {
    let results = [];
    compareAnswers(
      ownAnswers,
      matchesAnswers,
      matchesQuestions,
      questions,
      function(results) {
        if (results.matchQuestionsAnswered !== results.matchQuestions.length) {
          res.render('detail.ejs', {
            user: match,
            questions: results,
            currentQuestion:
              results.matchQuestions[results.matchQuestionsAnswered],
            currentPosition: results.matchQuestionsAnswered,
            questionLength: results.matchQuestions.length,
          });
        } else {
          res.render('detail.ejs', {
            same: results.matchingMatchesQuestions,
            currentPosition: results.matchQuestionsAnswered,
            questionLength: results.matchQuestions.length,
          });
        }
      }
    );
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
  if (req.user) {
    let user = Object.assign(
      {
        map: drawGoogleMaps(
          req.user.location.coordinates[0],
          req.user.location.coordinates[1],
          req.user.maxRange,
          process.env.GOOGLE_MAPS_KEY
        ),
      },
      req.user
    );
    res.render('profile.ejs', user);
  } else {
    res.render('login.ejs', { status: 401, error: '' });
  }
}

function ownquestions(req, res, next) {
  const { _id, questions = [] } = req.user;
  const userQuestions = questions.map(q => ObjectId(q._id));

  let answers = [];
  if (_id) {
    db
      .collection('questions')
      .find({ user: ObjectId(_id) })
      .toArray(function(err, questions) {
        getAnswers(questions);
      });

    function getAnswers(questions) {
      db
        .collection('answers')
        .find({
          user: ObjectId(_id),
          questionId: {
            $in: userQuestions,
          },
        })
        .toArray(function(err, answers) {
          done(questions, answers);
        });
    }

    function done(questions, answers) {
      // https://stackoverflow.com/questions/39246101/deep-merge-using-lodash
      let result = values(
        merge(keyBy(questions, '_id'), keyBy(answers, 'questionId'))
      );
      result.map(r => (r['questionId'] = r.questionId || r._id));

      res.render('ownquestions.ejs', { user: req.user, questions: result });
    }
  } else {
    res.render('login.ejs', { status: 401 });
  }
}

function updateProfile(req, res, next) {
  const {
    min = req.user.min,
    max = req.user.max,
    age = req.user.age,
    gender = req.user.gender,
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
        age: Number(age),
        gender: gender,
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

function addQuestion(req, res, next) {
  const {
    questions = req.user.questions || [],
    question = '',
    answers = [],
  } = req.body;

  if (question && answers) {
    if (answers.length < 2) {
      res.status(400);
    } else {
      db
        .collection('questions')
        .insertOne({
          question,
          answers: answers.filter(String),
          user: ObjectId(req.user._id),
        })
        .then(function({ ops }) {
          questions.push(...ops);

          db.collection('users').updateOne(
            { _id: req.user._id },
            {
              $set: {
                questions,
              },
            },
            done
          );
        });
    }
  }

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.status(200).redirect('/ownquestions');
    }
  }
}

function question(req, res) {
  const { _id } = req.user;
  db
    .collection('questions')
    .find()
    .toArray(function(err, questions) {
      db
        .collection('answers')
        .find({ user: ObjectId(_id) })
        .toArray(function(err, answered) {
          done(err, questions, answered);
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
  const path = new URL(req.header('referrer')).pathname;

  const { id, question, answer } = req.body;

  db.collection('answers').findOneAndUpdate(
    {
      user: ObjectId(_id),
      questionId: ObjectId(id),
    },
    {
      user: ObjectId(_id),
      questionId: ObjectId(id),
      question: question,
      answer: answer,
    },
    { upsert: true },
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.status(200).redirect(path);
    }
  }
}

function notFound(req, res) {
  res.status(404).render('not-found.ejs');
}
