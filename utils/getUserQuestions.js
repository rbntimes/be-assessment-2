module.exports = function(db, id, cb) {
  db
    .collection('questions')
    .find({ user: id })
    .toArray(function(err, userQuestions) {
      if (err) throw err;
      return cb(userQuestions);
    });
};
