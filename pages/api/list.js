import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';

import drawGoogleMaps from '../../utils/google-static-maps';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { _id, prefers, maxAge, minAge, location, maxRange } = req.user;

  const preferences = {
    _id: { $ne: _id },
    gender: prefers,
    age: { $lte: Number(maxAge), $gte: Number(minAge) },
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
  console.log(preferences);
  const map = drawGoogleMaps(
    req.user.location.coordinates[0],
    req.user.location.coordinates[1],
    req.user.maxRange,
    process.env.GOOGLE_MAPS_KEY
  );

  const result = await req.db.collection('users').find(preferences).toArray();

  res.status(200).json({ results: result, map });
});

export default handler;
