// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import createHandler from "@/jikopoint/middleware";
import User from "@/jikopoint/models/User";
// you can pass in middleware here
// maybe you have some permissions middleware
const handler = createHandler();

handler.get(async (req, res) => {
  const doc = await User.find().exec();
  res.json(doc);
});
export default handler;
