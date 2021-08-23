/* eslint-disable consistent-return */
import nextConnect from "next-connect";

import {
  getCourse,
  updateCourse,
  deleteCourse,
} from "@/jikopoint/controllers/course";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

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
  .put(async (req, res) => {
    if (!isValidOperation("course", req?.body)) {
      return res.status(400).send({ message: "Invalid Updates!" });
    }
    try {
      const course = await updateCourse(req?.query?.id, req?.body);
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

export default handler;
