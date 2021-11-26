import { getSession } from "next-auth/client";
import nc from "next-connect";

import { createEnrolment } from "@/jikopoint/controllers/enrolment";
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
      const enrolment = await createEnrolment(req?.body);
      res.json({ success: true, data: enrolment });
    } catch (e) {
      res.status(401).json({ message: e, success: false });
    }
  });

export default handler;
