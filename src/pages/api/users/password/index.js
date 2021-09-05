/* eslint-disable consistent-return */
import { getSession } from "next-auth/client";
import nc from "next-connect";

import { updateUser } from "@/jikopoint/controllers/user";
import middleware from "@/jikopoint/middleware/index";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .put(async (req, res) => {
    // make sure fields are allowed to be updated
    const session = await getSession({ req });
    if (!session?.user) {
      throw new Error("Hiki kitendo hakijathibitishwa");
    }
    if (!isValidOperation("user", req.body)) {
      // handle errors
      res.status(400).send({ message: "Invalid Updates!" });
    }
    const user = await updateUser(req.query.id, req.body);
    res.status(200).json({ success: true, user });
  });

export default handler;
