import { getSession } from "next-auth/client";
import nc from "next-connect";

import { createRole, getRoles } from "@/jikopoint/controllers/role";
import middleware from "@/jikopoint/middleware/index";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nc({ onNoMatch, onError })
  .use(middleware) // currently only database in middleware
  .get(async (req, res) => {
    try {
      const roles = await getRoles();
      res.json({ success: true, data: roles });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .post(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role?.name !== "admin") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const role = await createRole(req?.body);
      res.json({ success: true, data: role });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
