/* eslint-disable consistent-return */
import nc from "next-connect";

import { getUser, updateUser, deleteUser } from "@/jikopoint/controllers/user";
import middleware from "@/jikopoint/middleware/index";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const handler = nc({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const user = await getUser(req.query.id);
    res.status(200).json({ success: true, user });
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      return res.status(401).send("unauthenticated");
    }
    next();
  })
  .put(async (req, res) => {
    // make sure fields are allowed to be updated
    if (!isValidOperation("user", req.body)) {
      // handle errors
      res.status(400).send({ message: "Invalid Updates!" });
    }
    const user = await updateUser(req.query.id, req.body);
    res.status(200).json({ success: true, user });
  })
  .delete(async (req, res) => {
    const user = await deleteUser(req.query.id);
    res.status(200).json({ success: true, user });
  });

export default handler;
