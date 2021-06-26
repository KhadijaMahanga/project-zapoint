// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nextConnect from 'next-connect';
import middleware from '@/jikopoint/middleware/database';

const handler = nextConnect();
handler.use(middleware);
handler.get(async (req, res) => {
    let doc = await req.db.collection('elearning').findOne()
    res.json(doc);
});
export default handler;