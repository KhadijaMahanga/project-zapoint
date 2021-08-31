import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { getSession } from "next-auth/client";
import nc from "next-connect";

import { createLecture, getLectures } from "@/jikopoint/controllers/lecture";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const upload = multer({ dest: "public/uploads/" });

const handler = nc({ onNoMatch, onError })
  .use(middleware) // currently only database in middleware
  .get(async (req, res) => {
    try {
      const lectures = await getLectures();
      res.json({ success: true, data: lectures });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .post(upload.single("videoFile"), async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role !== "trainer") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      let lecVideo;
      if (req?.file && req?.body?.video?.length === 0) {
        const vd = await cloudinary.uploader.upload(req?.file?.path);
        lecVideo = vd?.secure_url;
      }
      const lecture = await createLecture({
        ...req?.body,
        video: lecVideo || req.body.video,
      });
      res.json({ success: true, data: lecture });
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
