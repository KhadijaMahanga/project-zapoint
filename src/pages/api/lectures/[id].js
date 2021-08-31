/* eslint-disable consistent-return */
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { getSession } from "next-auth/client";
import nextConnect from "next-connect";

import { updateLecture, deleteLecture } from "@/jikopoint/controllers/lecture";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const upload = multer({ dest: "public/uploads/" });

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .put(upload.single("videoFile"), async (req, res) => {
    if (!isValidOperation("lecture", req?.body)) {
      return res.status(400).send({ message: "Invalid Updates!" });
    }
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role === "trainee") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      let lecVideo;
      if (req?.file && req?.body?.video?.length === 0) {
        const vd = await cloudinary.uploader.upload(req?.file?.path);
        lecVideo = vd?.secure_url;
      }
      const lecture = await updateLecture(req?.query?.id, {
        ...req?.body,
        video: lecVideo || req.body.video,
      });
      if (!lecture) {
        return res
          .status(400)
          .json({ success: false, message: "lecture not found" });
      }
      res.json({ success: true, data: lecture });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedLecture = await deleteLecture(req?.query?.id);
      if (!deletedLecture) {
        return res
          .status(400)
          .json({ success: false, message: "lecture could not be deleted" });
      }
      res.json({ success: true, data: {} });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
