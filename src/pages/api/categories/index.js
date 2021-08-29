import { getSession } from "next-auth/client";
import nc from "next-connect";

import {
  createCategory,
  getCategories,
} from "@/jikopoint/controllers/coursecategory";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nc({ onNoMatch, onError })
  .use(middleware) // currently only database in middleware
  .get(async (req, res) => {
    try {
      const categories = await getCategories();
      res.json({ success: true, data: categories });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .post(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role !== "admin") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const category = await createCategory(req?.body);
      res.json({ success: true, data: category });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
