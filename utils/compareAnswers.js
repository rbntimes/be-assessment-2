const {
  values,
  merge,
  keyBy,
  differenceWith,
  isEqual,
  isEmpty,
  _,
  chain,
  flatten,
  find,
} = require('lodash');

const ObjectId = require('mongodb').ObjectId;

module.exports = function(own, match, matchesQuestions, questions, cb) {
  let answers = chain([...own, ...match, ...matchesQuestions])
    .groupBy('questionId')
    .toPairs()
    .map(x => x[1])
    .value();

  let useQuestions = [];
  let answered = [];
  let matching = 0;
  let matchingMatchesQuestions = 0;
  let matchingOwnQuestions = 0;
  let matchQuestionsAnswered = 0;
  let ownQuestionsAnswered = 0;

  answers.forEach(question => {
    if (!question[1] || question[1].answer === undefined) {
      return false;
    } else {
      answered.push({
        questionId: question[0].questionId,
        question: question[0].question,
        ownAnwer: question[0].answer || undefined,
        matchAnswer: (question[1] && question[1].answer) || undefined,
        match: question[1] && question[0].answer === question[1].answer,
      });

      if (find(matchesQuestions, { _id: question[0].questionId })) {
        if (question[1] && question[0].answer === question[1].answer) {
          matchQuestionsAnswered++;
          matchingMatchesQuestions++;
        } else {
          matchQuestionsAnswered++;
        }
      } else if (find(questions, { _id: question[0].questionId })) {
        if (question[1] && question[0].answer === question[1].answer) {
          ownQuestionsAnswered++;
          matchingOwnQuestions++;
        } else {
          ownQuestionsAnswered++;
        }
      }
      if (question[1] && question[0].answer === question[1].answer) {
        matching++;
      }
    }
  });
  useQuestions['matchingMatchesQuestions'] = matchingMatchesQuestions;
  useQuestions['matching'] = matching;
  useQuestions['matchQuestionsAnswered'] = matchQuestionsAnswered;
  useQuestions['matchQuestions'] = matchesQuestions;
  useQuestions['ownQuestionsAnswered'] = ownQuestionsAnswered;
  useQuestions['matchingOwnQuestions'] = matchingOwnQuestions;
  useQuestions['answered'] = answered;

  cb(useQuestions);
};
