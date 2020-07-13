import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import passport from '../../lib/passport';
import { extractUser } from '../../lib/api-helpers';

const handler = nextConnect();

handler.use(middleware);

handler.post(passport.authenticate('local'), (req, res) => {
  res.status(201).json({ user: extractUser(req) });
});

handler.delete((req, res) => {
  req.logOut();
  res
    .writeHead(301, {
      Location: '/',
    })
    .end();
});

export default handler;
