const questions = require('./questions_txt');
const https = require('https');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const calcMax = require('lodash/fp/max');
const randomGeoPoints = require('./randomgeo');
const userAmount = process.argv[2] || 500;
const userRadius = process.argv[3] || 150000;
const locations = randomGeoPoints(
  { lat: 52.322046, lng: 4.956157 },
  userRadius,
  userAmount
);
const maxRange = ['5000', '10000', '20000', '50000', '100000', '150000'];
const questionLength = 0;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function minMaxAge() {
  var min = calcMax([Math.floor(Math.random() * 80), 18]);
  var max = calcMax([Math.floor(Math.random() * 80), min + 5]);
  return {
    min: min,
    max: max,
  };
}

// DOE NIET GIERIG MET DIE GET BABY DEEL UIT (bombadier - zwart licht)
https.get(`https://randomuser.me/api/?results=${userAmount}`, res => {
  res.setEncoding('utf8');
  let body = '';
  res.on('data', data => {
    body += data;
  });
  res.on('end', () => {
    body = JSON.parse(body);
    getUserData(body);
  });
});

function getUserData(data) {
  var users = [];
  var answers = [];
  var questionList = [];

  for (var index = 0; index < data.results.length; index++) {
    users.push({
      name: `${capitalize(data.results[index].name.first)} ${capitalize(
        data.results[index].name.last
      )}`,
      gender: data.results[index].gender,
      age: calcMax([Math.floor(Math.random() * 80), 18]),
      minAge: minMaxAge()['min'],
      maxAge: minMaxAge()['max'],
      username: data.results[index].login.username,
      password: data.results[index].login.password,
      email: data.results[index].email,
      picture: data.results[index].picture.large,
      registered: data.results[index].registered,
      nationality: data.results[index].nat,
      location: {
        type: 'Point',
        coordinates: [locations[index].latitude, locations[index].longitude],
      },
      maxRange: maxRange[Math.floor(Math.random() * maxRange.length)],
    });
  }

  MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) throw err;

    questions.forEach(q => {
      questionList.push({
        question: q.question,
        answer: q.answers,
      });
      if (questions.length === questionList.length) {
        db
          .db('endless')
          .collection('questions')
          .insertMany(questionList, function(err, res) {
            if (err) throw err;
            db
              .db('endless')
              .collection('questions')
              .count()
              .then(function(qLength) {
                fillUsers(qLength);
              });
            function fillUsers(questionLength) {
              db
                .db('endless')
                .collection('users')
                .insertMany(users, function(err, res) {
                  if (err) throw err;
                  fillQuestions(res.ops);
                });
              function fillQuestions(users) {
                db
                  .db('endless')
                  .collection('users')
                  .createIndex({ location: '2dsphere' });

                users.forEach(function(user) {
                  db
                    .db('endless')
                    .collection('questions')
                    .find()
                    .forEach((question, index) => {
                      answers.push({
                        user: user._id,
                        question: question._id,
                        q: question.question,
                        answer:
                          question.answer[
                            Math.floor(Math.random() * question.answer.length)
                          ],
                      });
                      if (users.length * questionLength === answers.length) {
                        db
                          .db('endless')
                          .collection('answers')
                          .insertMany(answers, function(err, res) {
                            if (err) throw err;
                            done();
                          });
                      }
                    });
                });
                function done() {
                  db
                    .db('endless')
                    .collection('users')
                    .insertOne({
                      name: 'Cees Ligtelijn',
                      gender: 'male',
                      username: 'cees',
                      age: 20,
                      _id: ObjectId('5aaa5ddcec8f2ebc9bfb496b'),
                      minAge: 18,
                      maxAge: 25,
                      prefers: 'female',
                      location: {
                        type: 'Point',
                        coordinates: [52.322125, 4.956157],
                      },
                      maxRange:
                        maxRange[Math.floor(Math.random() * maxRange.length)],
                    })
                    .then(db.close());
                }
              }
            }
          });
      }
    });
  });
}
