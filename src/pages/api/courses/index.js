import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { getSession } from "next-auth/client";
import nc from "next-connect";

import { createCourse, getCourses } from "@/jikopoint/controllers/course";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const upload = multer({ dest: "public/uploads/" });

const handler = nc({ onNoMatch, onError })
  .use(middleware) // currently only database in middleware
  .get(async (req, res) => {
    try {
      const courses = await getCourses();
      res.json({ success: true, data: JSON.stringify(courses) });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .post(upload.single("coverPhoto"), async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role !== "trainer") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      let cover;
      if (req?.file) {
        const image = await cloudinary.uploader.upload(req?.file?.path);
        cover = image.secure_url;
      }
      const course = await createCourse({
        ...req?.body,
        instructor: JSON.parse(req?.body?.instructor),
        category: JSON.parse(req?.body?.category),
        image: cover,
      });
      res.json({ success: true, data: JSON.stringify(course) });
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
