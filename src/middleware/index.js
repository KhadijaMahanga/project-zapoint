import nextConnect from "next-connect";

import database from "./database";

export default function createHandler(...middlewares) {
  return nextConnect().use(database, ...middlewares);
}
