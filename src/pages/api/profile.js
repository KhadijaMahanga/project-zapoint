/* eslint-disable consistent-return */
import { getSession } from "next-auth/client";
import nc from "next-connect";

import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "@/jikopoint/controllers/profile";
import middleware from "@/jikopoint/middleware/index";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const profile = await getProfile(req.query.id);
    res.status(200).json({ success: true, profile });
  })
  .put(async (req, res) => {
    const session = await getSession({ req });
    if (!(session && session?.user)) {
      throw new Error("Hiki kitendo hakijathibitishwa");
    }
    // make sure fields are allowed to be updated
    if (!isValidOperation("profile", req.body)) {
      // handle errors
      res.status(400).send({ message: "Invalid Updates!" });
    }
    const profile = await updateProfile(req.query.id, req.body);
    res.status(200).json({ success: true, profile });
  })
  .delete(async (req, res) => {
    const session = await getSession({ req });
    if (!session && session?.user) {
      throw new Error("Hiki kitendo hakijathibitishwa");
    }
    const profile = await deleteProfile(req.query.id);
    res.status(200).json({ success: true, profile });
  });

export default handler;
