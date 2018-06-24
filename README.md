# endless ∞

Endless is my own idea on how a dating platform should be. You want to have as much in common w/ your new partner as possible right? Endless is exactly that.

By answering a endless-y (see what i did there?) growing pool of questions you and your top matches have a lot in common. By adding questions you help the pool growing and if other users answer those they might even have your personal questions in common. And that's exactly when i want you guys to meet up.

## To make this work (on a mac..)

* You will need node/npm installed ([easiest trough brew](http://brew.sh/)) and `brew install node`
* You will need a google maps api key from [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
* [Compass](https://www.mongodb.com/products/compass) is an neath extra to see some of the magic

1. `Git clone the repo`
2. `cd endless`
3. `nano .env` and add the following:
   DB_HOST=localhost
   DB_PORT=27017
   DB_NAME=endless
   MY_MOST_BELOVED_SECRET=kanyeisthemostinfluential (<== may be anything)
   GOOGLE_MAPS_KEY=YOURGOOGLEMAPSKEY
4. `npm install || yarn`
5. `brew install mongodb` (if [brew](https://brew.sh/) installed ofcourse)
6. `mkdir db`
7. Open another tab in your terminal, navigate to endless and run `mongod --dbpath db`
8. Open a new tab, to start with some test users run `node mongo.js 100 50000`, this will fill the database with 100 test users in a radius of 50km (from utrecht, might need to rethink that)
9. `npm run start || yarn start`
10. create a account and find your match!

### Still not convinced?

![Sorry](https://media.giphy.com/media/RFDXes97gboYg/giphy.gif)
