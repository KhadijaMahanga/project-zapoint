/* eslint-disable consistent-return */
import nextConnect from "next-connect";

import { getAllCourses } from "@/jikopoint/controllers/course";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const courses = await getAllCourses();
    if (!courses) {
      return res
        .status(400)
        .json({ success: false, message: "Courses not found" });
    }
    res.json({ success: true, data: courses });
  });

export default handler;
