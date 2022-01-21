/* eslint-disable consistent-return */
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

import { getUserProfile } from "@/jikopoint/controllers/profile";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session?.user) {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const profile = await getUserProfile(req?.query?.id);
      if (!profile) {
        return res
          .status(400)
          .json({ success: false, message: "profile not found" });
      }
      res.json({ success: true, data: profile });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
