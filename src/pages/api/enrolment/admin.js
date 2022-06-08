/* eslint-disable consistent-return */
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

import { getAllEnrolments } from "@/jikopoint/controllers/enrolment";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role !== "admin") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const enrolments = await getAllEnrolments();
      if (!enrolments) {
        return res
          .status(400)
          .json({ success: false, message: "Enrolments not found" });
      }
      res.json({ success: true, data: enrolments });
    } catch (e) {
      res.status(401).json({ message: e, success: false });
    }
  });

export default handler;
