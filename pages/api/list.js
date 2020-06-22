import nextConnect from 'next-connect';
import middleware from '../../lib/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection('users')

    res.json(doc);
});

export default handler;