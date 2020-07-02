import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';

import drawGoogleMaps from '../../../utils/google-static-maps';

const { ObjectId } = require('mongodb');

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const user = await req.db
    .collection('users')
    .findOne({ _id: ObjectId(req.query.id) });

  const map = drawGoogleMaps(
    req.user.location.coordinates[0],
    req.user.location.coordinates[1],
    req.user.maxRange,
    process.env.GOOGLE_MAPS_KEY
  );
  return res.status(200).json({ user, map });
});

export default handler;
