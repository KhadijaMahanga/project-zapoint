/* eslint-disable consistent-return */
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { getSession } from "next-auth/client";
import nextConnect from "next-connect";

import {
  getCourse,
  updateCourse,
  deleteCourse,
} from "@/jikopoint/controllers/course";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const upload = multer({ dest: "public/uploads/" });

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const course = await getCourse(req?.query?.id);
    if (!course) {
      return res
        .status(400)
        .json({ success: false, message: "Course not found" });
    }
    res.json({ success: true, data: course });
  })
  .put(upload.single("coverPhoto"), async (req, res) => {
    if (!isValidOperation("course", req?.body)) {
      return res.status(400).send({ message: "Invalid Updates!" });
    }
    try {
      const session = await getSession({ req });
      if (!session && session?.user?.role === "trainee") {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      let cover;
      if (req?.file) {
        const image = await cloudinary.uploader.upload(req?.file?.path);
        cover = image?.secure_url ?? null;
      }

      let update = {
        ...req?.body,
        isArchived: false,
      };
      if (cover || req.body.image) {
        update = {
          ...update,
          image: cover || req.body.image,
        };
      }
      console.log(update);
      const course = await updateCourse(req?.query?.id, update);
      if (!course) {
        return res
          .status(400)
          .json({ success: false, message: "Course not found" });
      }
      res.json({ success: true, data: course });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedCourse = await deleteCourse(req?.query?.id);
      if (!deletedCourse) {
        return res
          .status(400)
          .json({ success: false, message: "Course could not be deleted" });
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
