/* eslint-disable consistent-return */
import { getSession } from "next-auth/client";
import nextConnect from "next-connect";

import { deleteEnrolment } from "@/jikopoint/controllers/enrolment";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .delete(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role !== "trainee") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const deleteEnrol = await deleteEnrolment(req?.query?.id);
      if (!deleteEnrol) {
        return res
          .status(400)
          .json({ success: false, message: "Enrolment could not be deleted" });
      }
      res.json({ success: true, data: {} });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
