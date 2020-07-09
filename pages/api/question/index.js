import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';

const { ObjectId } = require('mongodb');

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const answers = await req.db
    .collection('answers')
    .find({ user: req.user._id })
    .toArray();

  const question = await req.db
    .collection('questions')
    .findOne({ index: answers.length });

  if (question) {
    return res.status(200).json(question);
  }
});

handler.post(async (req, res) => {
  const { answer, question, questionId } = req.body;
  const add = await req.db.collection('answers').insertOne(
    {
      user: ObjectId(req.user._id),
      questionId: ObjectId(questionId),
      question,
      answer,
    },
    { upsert: true }
  );

  return res.status(201).json({ status: 'ok' });
});

export default handler;
