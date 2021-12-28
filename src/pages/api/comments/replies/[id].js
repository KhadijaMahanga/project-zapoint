import nc from "next-connect";

import { getRepliesPerComment } from "@/jikopoint/controllers/comment";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nc({ onNoMatch, onError })
  .use(middleware) // currently only database in middleware
  .get(async (req, res) => {
    try {
      const comments = await getRepliesPerComment(req?.query?.id);
      res.json({ success: true, data: comments });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
