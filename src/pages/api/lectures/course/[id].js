/* eslint-disable consistent-return */
import nextConnect from "next-connect";

import { getLecturesPerCourse } from "@/jikopoint/controllers/lecture";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const lectures = await getLecturesPerCourse(req?.query?.id);
    if (!lectures) {
      return res
        .status(400)
        .json({ success: false, message: "lectures not found" });
    }
    res.json({ success: true, data: lectures });
  });

export default handler;
