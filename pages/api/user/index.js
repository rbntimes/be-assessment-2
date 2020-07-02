import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
import { extractUser } from '../../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => res.json({ user: extractUser(req) }));

handler.patch(async (req, res) => {
  const { name, gender, age, minAge, maxAge, prefers } = req.body;

  const user = await req.db.collection('users').updateOne(
    { _id: req.user._id },
    {
      $set: {
        ...(name && { name }),
        ...(gender && { gender }),
        ...(age && { age }),
        ...(minAge && { minAge }),
        ...(maxAge && { maxAge }),
        ...(prefers && { prefers }),
      },
    }
  );

  res.status(200).json({ user });
});

export default handler;
