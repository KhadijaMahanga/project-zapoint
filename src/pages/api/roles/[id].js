/* eslint-disable consistent-return */
import nextConnect from "next-connect";

import { getRole, updateRole, deleteRole } from "@/jikopoint/controllers/role";
import middleware from "@/jikopoint/middleware/index";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const role = await getRole(req?.query?.id);
    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "role not found" });
    }
    res.json({ success: true, data: role });
  })
  .put(async (req, res) => {
    if (!isValidOperation("role", req?.body)) {
      return res.status(400).send({ message: "Invalid Updates!" });
    }
    try {
      const role = await updateRole(req?.query?.id, req?.body);
      if (!role) {
        return res
          .status(400)
          .json({ success: false, message: "role not found" });
      }
      res.json({ success: true, data: role });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedRole = await deleteRole(req?.query?.id);
      if (!deletedRole) {
        return res
          .status(400)
          .json({ success: false, message: "role could not be deleted" });
      }
      res.json({ success: true, data: {} });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
