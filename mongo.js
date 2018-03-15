load('./questions_txt.js');
// load('./users.js');

// Questions
// questions.map(q => {
//   db.questions.insert({
//     // id: q.id,
//     question: q.question,
//     answer: q.answers,
//   });
// });

// questions w/ answers
var users = db.users.find();
var questions = db.questions.find();
db.users.find().forEach(function(user) {
  db.questions.find().forEach(function(question) {
    db.answers.insert({
      user: user._id,
      question: question._id,
      q: question.question,
      answer:
        question.answer[Math.floor(Math.random() * question.answer.length)],
    });
  });
});
