import { getSession } from "next-auth/client";
import nc from "next-connect";

import { createComment } from "@/jikopoint/controllers/comment";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nc({ onNoMatch, onError })
  .use(middleware) // currently only database in middleware
  .post(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session && session?.user) {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const comment = await createComment(req?.body);
      res.json({ success: true, data: comment });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
