/* eslint-disable semi */

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var haversine = require('haversine');

require('dotenv').config();

var db = null;
var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, function(err, client) {
  if (err) {
    throw err;
  }

  db = client.db(process.env.DB_NAME);
});

var upload = multer({ dest: 'static/upload/' });

express()
  .use(express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', matchList)
  .get('/nojs', matche)
  .get('/data', matche)
  .post('/', add)
  .post('/profile', updateProfile)
  .get('/questions', question)
  .get('/profile', profile)
  .get('/users/:id', match)
  .use(notFound)
  .listen(8000);

function matchList(req, res, next) {
  res.render('endless.ejs');
}

function matche(req, res, next) {
  matches = [];
  db
    .collection('users')
    .find({ username: 'cees' })
    .toArray(function(err, data) {
      cees = data[0];
      var preferences = {
        _id: { $ne: cees._id },
        gender: cees.prefers,
        age: { $lte: cees.maxAge, $gte: cees.minAge },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [
                cees.location.coordinates[0],
                cees.location.coordinates[1],
              ],
            },
            $maxDistance: Number(cees.maxRange),
          },
        },
      };
      db
        .collection('answers')
        .find({ user: data[0]._id })
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
                  cees.location.coordinates[0],
                  cees.location.coordinates[1],
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
      console.log('hier');
      res.render('nojs.ejs', { data: data });
    } else {
      res.render('list.ejs', { data: data });
    }
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

function profile(req, res, next) {
  db.collection('users').findOne(
    {
      username: 'cees',
    },
    done
  );

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.render('profile.ejs', { data: data });
    }
  }
}

function updateProfile(req, res, next) {
  db
    .collection('users')
    .find({ username: 'cees' })
    .toArray(function(err, data) {
      addToDB(err, data[0]._id);
    });

  function addToDB(err, userId) {
    db.collection('users').updateOne(
      { username: 'cees' },
      {
        $set: {
          minAge: Number(req.body.min),
          maxAge: Number(req.body.max),
          prefers: req.body.prefers,
          maxRange: req.body.maxRange,
        },
      },
      done
    );
  }

  function done(err, data) {
    if (err) {
      next(err);
    } else {
      res.redirect('/profile');
    }
  }
}

function question(req, res) {
  db
    .collection('questions')
    .find()
    .toArray(function(err, data) {
      questions = data;
      db
        .collection('answers')
        .find({ user: ObjectId('5aaa5ddcec8f2ebc9bfb496b') })
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
  db
    .collection('users')
    .find({ username: 'cees' })
    .toArray(function(err, data) {
      addToDB(err, data[0]._id);
    });

  function addToDB(err, userId) {
    db.collection('answers').insertOne(
      {
        user: userId,
        question: ObjectId(req.body.id),
        q: req.body.question,
        answer: req.body.answer,
      },
      done
    );
  }

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
