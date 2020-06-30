import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { extractUser } from '../../lib/api-helpers';
import { withSession } from 'next-session';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const {
    _id,
    prefers,
    maxAge,
    minAge,
    location,
    maxRange,
    questions = [],
  } = req.user;

  const preferences = {
    _id: { $ne: _id },
    gender: prefers,
    age: { $lte: maxAge, $gte: minAge },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [location.coordinates[0], location.coordinates[1]],
        },
        $maxDistance: Number(maxRange),
      },
    },
  };

  const result = await req.db.collection('users').find(preferences).toArray();

  res.status(200).json(result);
});

export default handler;
