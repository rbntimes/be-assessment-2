const express = require('express')
const next = require('next')

const bodyParser = require("body-parser");
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const url = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT;

// passport.use(
//   new Strategy(function(username, password, cb) {
//     db.collection("users")
//       .findOne({ username })
//       .then(function(user) {
//         if (!user) {
//           return cb(404, false);
//         }
//         bcrypt.compare(password, user.password, function(err, res) {
//           if (err) return cb(err);
//           if (res === false) {
//             return cb(401, false);
//           } else {
//             return cb(null, user);
//           }
//         });
//       });
//   })
// );

// // Serialize and deserialize user when setting/getting info from session cookie
// // https://stackoverflow.com/a/28693104

// passport.serializeUser(function(user, cb) {
//   cb(null, user._id);
// });

// passport.deserializeUser(function(id, cb) {
//   db.collection("users")
//     .findOne({ _id: ObjectId(id) })
//     .then(function(user) {
//       if (!user) {
//         return cb(null, false);
//       }
//       cb(null, user);
//     });
// });

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
    .post("/register", function(req, res, next) {
        console.log(req, res)
        let code = 200;
        const { username, password, passwordConf } = req.body;
        if (!username || !password || !passwordConf) {
          code = 400;
          res.status(code).render("register.ejs", {
            error: authentication[code],
            status: code
          });
        }
    
        db.collection("users")
          .findOne({ username: username })
          .then(function(user) {
            if (user) {
              code = 409;
              res.status(code).render("register.ejs", {
                error: authentication.register[code],
                status: code
              });
            } else if (password !== passwordConf) {
              code = 422;
              res.status(code).render("register.ejs", {
                error: authentication.register[code],
                status: code
              });
            } else {
              createUser(req.body, done);
    
              function done(user) {
                db.collection("users")
                  .insertOne(user)
                  .then(function(user) {
                    passport.authenticate("local", function(err, user) {
                      req.logIn(user, function(err) {
                        if (err) {
                          return res.status(err).redirect("/profile");
                        }
                        if (!err) {
                          res.status(201).redirect("/profile");
                        }
                      });
                    })(req, res, next);
                  });
              }
            }
          });
      })

      server.all('*', (req, res) => {
        return handle(req, res)
    })



  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})