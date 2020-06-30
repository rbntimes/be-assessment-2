import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/api-helpers';
const ObjectId = require('mongodb').ObjectId;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = await req.db
    .collection('users')
    .findOne({ _id: ObjectId(req.query.id) });
  return res.json(user);
});

export default handler;
