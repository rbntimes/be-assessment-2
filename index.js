const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let db = null;
const url = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT;

mongo.MongoClient.connect(
  url,
  function(err, client) {
    if (err) {
      throw err;
    }

    db = client.db(process.env.DB_NAME);
  }
);

passport.use(
  new Strategy(function(username, password, cb) {
    db.collection("users")
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
  db.collection("users")
    .findOne({ _id: ObjectId(id) })
    .then(function(user) {
      if (!user) {
        return cb(null, false);
      }
      cb(null, user);
    });
});

app.prepare().then(() => {
  const server = express()
  server
    .use(express.static("static"))
    .use(bodyParser.urlencoded({ extended: true }))
    .use(require("morgan")("combined"))
    .use(require("cookie-parser")())
    .use(require("body-parser").urlencoded({ extended: true }))
    .use(require("body-parser").json())
    .use(
        session({
        secret: process.env.MY_MOST_BELOVED_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            url: url
        })
        })
    )
    .use(passport.initialize())
    .use(passport.session())

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})