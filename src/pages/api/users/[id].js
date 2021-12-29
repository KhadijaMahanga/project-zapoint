/* eslint-disable consistent-return */
import { getSession } from "next-auth/react";
import nc from "next-connect";

import { getUser, updateUser, deleteUser } from "@/jikopoint/controllers/user";
import middleware from "@/jikopoint/middleware/index";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const user = await getUser(req.query.id);
    res.status(200).json({ success: true, user });
  })
  .put(async (req, res) => {
    // make sure fields are allowed to be updated
    const session = await getSession({ req });
    if (!(session && session?.user)) {
      throw new Error("Hiki kitendo hakijathibitishwa");
    }
    if (!isValidOperation("user", req.body)) {
      // handle errors
      res.status(400).send({ message: "Invalid Updates!" });
    }
    const user = await updateUser(req.query.id, req.body);
    res.status(200).json({ success: true, user });
  })
  .delete(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role !== "admin") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const user = await deleteUser(req.query.id);
      res.status(200).json({ success: true, user });
    } catch (e) {
      res.status(401).json({ message: e.message, success: false });
    }
  });

export default handler;
