// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createHandler } from '@/jikopoint/middleware';
import User from "@/jikopoint/models/User";
// you can pass in middleware here
// maybe you have some permissions middleware
const handler = createHandler();

handler
  .get(async (req, res) => {
    let doc = await User.findOne({ _id: req.});
    res.json(doc);
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send('unauthenticated')
    } else {
      next();
    }
  })
  .put((req, res) => {
    const { name } = req.body
    const user = updateUserByUsername(req, req.user.username, { name })
    res.json({ user })
  })
  .delete((req, res) => {
    deleteUser(req)
    req.logOut()
    res.status(204).end()
  })
export default handler;