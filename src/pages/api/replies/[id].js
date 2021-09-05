/* eslint-disable consistent-return */
import { getSession } from "next-auth/client";
import nextConnect from "next-connect";

import {
  getCategory,
  updateCategory,
  deleteCategory,
} from "@/jikopoint/controllers/coursecategory";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const category = await getCategory(req?.query?.id);
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "category not found" });
    }
    res.json({ success: true, data: category });
  })
  .put(async (req, res) => {
    if (!isValidOperation("category", req?.body)) {
      return res.status(400).send({ message: "Invalid Updates!" });
    }
    try {
      const category = await updateCategory(req?.query?.id, req?.body);
      if (!category) {
        return res
          .status(400)
          .json({ success: false, message: "category not found" });
      }
      res.json({ success: true, data: category });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .delete(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session?.user) {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const deletedCategory = await deleteCategory(req?.query?.id);
      if (!deletedCategory) {
        return res
          .status(400)
          .json({ success: false, message: "Category could not be deleted" });
      }
      res.json({ success: true, data: {} });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
