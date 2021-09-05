/* eslint-disable consistent-return */
import { getSession } from "next-auth/client";
import nextConnect from "next-connect";

import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "@/jikopoint/controllers/profile";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    // expecting a user id
    const profile = await getProfile(req?.query?.id);
    if (!profile) {
      return res
        .status(400)
        .json({ success: false, message: "profile not found" });
    }
    res.json({ success: true, data: profile });
  })
  .put(async (req, res) => {
    const session = await getSession();
    if (!session?.user) {
      throw new Error("Hiki kitendo hakijathibitishwa");
    }
    if (!isValidOperation("profile", req?.body)) {
      return res.status(400).send({ message: "Invalid Updates!" });
    }
    try {
      // expecting a profile id
      const profile = await updateProfile(req?.query?.id, req?.body);
      if (!profile) {
        return res
          .status(400)
          .json({ success: false, message: "profile not found" });
      }
      res.json({ success: true, data: profile });
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
      const deletedProfile = await deleteProfile(req?.query?.id);
      if (!deletedProfile) {
        return res
          .status(400)
          .json({ success: false, message: "profile could not be deleted" });
      }
      res.json({ success: true, data: {} });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
