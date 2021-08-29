// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from "next-connect";

import { getUsers } from "@/jikopoint/controllers/user";
import middleware from "@/jikopoint/middleware";
import registerUser from "@/jikopoint/utils/auth/registerUser";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
// you can pass in middleware here
// maybe you have some permissions middleware
const handler = nextConnect({ onError, onNoMatch })
  .use(middleware)
  .get(async (req, res) => {
    const users = await getUsers();
    res.json({ success: true, users });
  })
  .post(async (req, res) => {
    const user = await registerUser(req?.body);
    if (!user) {
      res.status(400).json({ message: "error creating user", success: false });
    }
    if (user) {
      res.json({ success: true, user });
    }
  });

export default handler;
