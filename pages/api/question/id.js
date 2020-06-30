import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/api-helpers';
const ObjectId = require('mongodb').ObjectId;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const answers = await req.db
    .collection('answers')
    .find({ user: req.user._id })
    .toArray();

  const answer = await req.db
    .collection('questions')
    .find()
    .limit(-1)
    .skip(answers.length)
    .next();

  return res.status(200).json(answer);
});

export default handler;
