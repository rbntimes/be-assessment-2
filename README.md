# Endless ∞

---

## The idea

Endless ∞ is an dating app aimed to match people mathematical instead of on profile pictures alone. I will try my best to give you an insight in how i tried doing just that.

### Input

The idea is simple, you download the app and fill in as many questions as you can. The bare app has 1324 questions filled out already. Some really deep and philisophical, some musically, others can be religously, political, movie interest and so on.

### Output

Because this big list of starting questions you should have enough content to last a while. And by answering you give more and more information about yourself. This output is stored and creates a data-rich profile for you to be matched upon.

### Matches

The more users the app gets, the more chances on matches you have. The app compares all your questions agains the questions filled in by others. By doing this you might find someone who is the complete opposite of you (and thereby probably not a great match), or find the perfect match who thinks exactly the same about a lot of things.

### Questions

All you need to do is answer as many questions as you like. To make sure your future match really is exactly like you, you can also add your own questions that your potential match needs to answer before really being able to be a match.

### Percentages

The match percentage you and your match have are dependent on the questions you both answered the same and the amount of questions you have answered. This gives you the following example.

You have answered 100 questions, quite a lot.

- Match A answered only 10 questions, but 8 of them the same as you answered them.
- Match B answered a total of 80 questions, and 64 of the answers where the same as you.

Both matches are an **80% match**. But in reality the probability of answering 80% of the questions the same out of 80 questions is a lot lower then in case A where only 10 questions where filled.

That gives us the following, the more questions you answer and add to the app, the higher the matches potentionally could be. What if someone answers 1000 questions **EXACTLY THE SAME**. That would be a bit scary, but it must be the one right?

### Prefrerences

The app let's you set bounderies for your ideal match. Like an age limitation, gender and distance from you. That will make sure that your match is easily reachable and not on the other side of the world (if you are not in to that).

---

## Where did it start

This project is a fork of the [this project](https://github.com/rbntimes/be-assessment-2.git). During that project i got to make an application using a node backend. In this project i had chosen to use ejs as a template render engine.

## Current status

The app is workable, although it has it's limitations. Comparing the answers of a user agains 140k database entries slowed up the server **A LOT**. This is something that will probably never be polished out perfectly but is something that can be done a lot better.

There is also a great deal of styling missing as i spend way to much time overengeneering this application with stuff like a realtime chat and other things absolutely not needed for the project itself.

## What's next

I still really like the idea of the application. I really want to refactor it and make something presentable of the whole idea. I therefor hope to be able to finish this application and course doing the following:

- A1: For assessment 1 (a1) I will make the following things:

  - Research existing (dating) apps and document it
  - A styleguide for Endless
  - I will make a job story for Endless
  - Research into code standards, linters, template engines, editors etc.
  - I will setup a fork and properly use git when refactoring the code.

- A2: For assessment 2 (a2) I will do the following:

  - Whilst refactoring i will properly make use of git by using branches, github pages and pull requests.
  - I will work out the job story of A1.
  - I will ask a colleague to go through the project, review some pull requests and knowing my colleagues I'm sure they will have some comments on it.
  - I will properly take the action needed for the given issues and let them be re-reviewed.
  - I will make sure Endless runs live.
  - I will make sure this README is just for the app, like a normal github readme whilest moving course information to github pages.

Please let me know what you think about the idea.

---

## Technical information

The following is 2 year old documentation on how the app works. This is for if you want to run it yourself. Please note, while this should work in the new version it will be updated to be proper documentation.

### How to make Endless run locally (on a Mac..)

- You will need node/npm installed ([easiest trough brew](http://brew.sh/)) and `brew install node`
- You will need to have mongodb installed ([easiest trough brew](http://brew.sh/)) and `brew install mongodb`
- You will need a google maps api key from [here](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Compass](https://www.mongodb.com/products/compass) is an neath extra to see some of the magic

1. `Git clone the repo`
2. `cd endless`
3. `nano .env` and add the following:
   - DB_HOST=localhost
   - DB_PORT=27017
   - DB_NAME=endless
   - MY_MOST_BELOVED_SECRET=kanyeisthemostinfluential (<== may be anything)
   - GOOGLE_MAPS_KEY=\$YOURGOOGLEMAPSKEY
4. `npm install || yarn`
5. Create a directory called `db`
6. Open another tab in your terminal, navigate to this project and `run mongod --dbpath db`
7. To start with some test users run `node mongo.js 100 50000`, this will fill the database with 100 test users in a radius of 50km (from Utrecht, might need to rethink that)
8. `npm run start || yarn start`
9. create an account and find your match!
