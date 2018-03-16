/* eslint-disable semi */

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectId;

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
  .get('/', movies)
  .post('/', add)
  .post('/profile', updateProfile)
  .get('/questions', form)
  // .get('/:id', match)
  .get('/profile', profile)
  .delete('/:id', remove)
  .use(notFound)
  .listen(8000);

function movies(req, res, next) {
  matches = [];

  db
    .collection('users')
    .find({ username: 'cees' })
    .toArray(function(err, data) {
      db
        .collection('answers')
        .find({ user: data[0]._id })
        .toArray(function(err, data) {
          self = data;

          db
            .collection('users')
            .find({ gender: 'female' })
            .forEach(function(user) {
              getUserData(user, self);
            });
        });
    });

  function getUserData(user, self) {
    db
      .collection('answers')
      .find({ user: user._id })
      .toArray(function(err, data) {
        goCompareShit(user, data, self);
      });
  }

  function goCompareShit(user, data, self) {
    var equalAnswers = self.filter(
      (val, index) => val.answer === data[index].answer
    );

    matches.push({
      id: user._id,
      name: user.name,
      age: user.age,
      match: Math.round(equalAnswers.length / self.length * 100),
      same: [equalAnswers.length, self.length],
    });

    if (matches.length === 99) {
      console.log('hier');
      done(matches.sort((x, y) => y.match - x.match));
    }
  }

  function done(data) {
    res.render('list.ejs', { data: data });
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
    console.log(data);
    if (err) {
      next(err);
    } else {
      res.render('profile.ejs', { data: data });
    }
  }
}

function updateProfile(req, res, next) {
  console.log(req.body);
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

function form(req, res) {
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
      res.render('add.ejs', { data: questions[answered.length] });
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
    console.log(req.body, userId);
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

function remove(req, res, next) {
  var id = req.params.id;

  db.collection('movies').deleteOne(
    {
      _id: new mongo.ObjectID(id),
    },
    done
  );

  function done(err) {
    if (err) {
      next(err);
    } else {
      res.json({ status: 'ok' });
    }
  }
}

function notFound(req, res) {
  res.status(404).render('not-found.ejs');
}
