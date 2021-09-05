// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";

import middleware from "@/jikopoint/middleware";
import resetUserCredentials from "@/jikopoint/utils/auth/resetUserCredentials";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
// you can pass in middleware here
// maybe you have some permissions middleware
const handler = nextConnect({ onError, onNoMatch })
  .use(middleware)
  .post(async (req, res) => {
    try {
      await resetUserCredentials(req?.body);
      res.json({ success: true });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
