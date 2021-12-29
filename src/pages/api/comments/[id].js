/* eslint-disable consistent-return */
import { getSession } from "next-auth/react";
import nextConnect from "next-connect";

import {
  getComment,
  updateComment,
  deleteComment,
} from "@/jikopoint/controllers/comment";
import middleware from "@/jikopoint/middleware";
import { onNoMatch, onError } from "@/jikopoint/utils/handlers";
import isValidOperation from "@/jikopoint/utils/isValidOperation";

const handler = nextConnect({ onNoMatch, onError })
  .use(middleware)
  .get(async (req, res) => {
    const comment = await getComment(req?.query?.id);
    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: "comment not found" });
    }
    res.json({ success: true, data: comment });
  })
  .put(async (req, res) => {
    if (!isValidOperation("comment", req?.body)) {
      return res.status(400).send({ message: "Invalid Updates!" });
    }
    try {
      const comment = await updateComment(req?.query?.id, req?.body);
      if (!comment) {
        return res
          .status(400)
          .json({ success: false, message: "Comment not found" });
      }
      res.json({ success: true, data: comment });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  })
  .delete(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session?.user) {
        throw new Error("Hiki kitendo hakijathibitishwa");
      }
      const deletedComment = await deleteComment(req?.query?.id);
      if (!deletedComment) {
        return res.status(400).json({
          success: false,
          message: "commentComment could not be deleted",
        });
      }
      res.json({ success: true, data: {} });
    } catch (e) {
      res.status(401).send({ message: e, success: false });
    }
  });

export default handler;
