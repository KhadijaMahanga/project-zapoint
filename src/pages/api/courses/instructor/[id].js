import nc from "next-connect";

import { getInstructorCourses } from "@/jikopoint/controllers/course";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";

const handler = nc({ onNoMatch, onError })
  .use(middleware) // currently only database in middleware
  .get(async (req, res) => {
    try {
      const courses = await getInstructorCourses();
      res.json({ success: true, data: courses });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
