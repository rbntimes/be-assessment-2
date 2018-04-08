module.exports = function(db, id, cb) {
  db
    .collection('answers')
    .find({ user: id })
    .toArray(function(err, userAnswers) {
      if (err) throw err;
      return cb(userAnswers);
    });
};
