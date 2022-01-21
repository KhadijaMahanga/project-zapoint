/* eslint-disable consistent-return */
import nextConnect from "next-connect";

import { getAllEnrolments } from "@/jikopoint/controllers/enrolment";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const enrolments = await getAllEnrolments();
    if (!enrolments) {
      return res
        .status(400)
        .json({ success: false, message: "Enrolments not found" });
    }
    res.json({ success: true, data: enrolments });
  });

export default handler;
