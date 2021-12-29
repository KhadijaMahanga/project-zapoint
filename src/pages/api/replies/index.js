import { getSession } from "next-auth/react";
import nc from "next-connect";

import { createReply } from "@/jikopoint/controllers/reply";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nc({ onNoMatch, onError })
  .use(middleware) // currently only database in middleware
  .post(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session?.user) {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const reply = await createReply(req?.body);
      res.json({ success: true, data: reply });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
