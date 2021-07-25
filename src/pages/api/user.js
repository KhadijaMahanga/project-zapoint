// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createHandler } from "@/jikopoint/middleware";
import User from "@/jikopoint/models/User";
// you can pass in middleware here
// maybe you have some permissions middleware
const handler = createHandler();

handler
  .get(async (req, res) => {
    const doc = await User.findOne({ _id: req.user.id });
    res.json(doc);
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send("unauthenticated");
    } else {
      next();
    }
  });
  
export default handler;
