import database from "./database";

import nextConnect from "next-connect";

export function createHandler(...middlewares) {
  return nextConnect().use(database, ...middlewares);
}
