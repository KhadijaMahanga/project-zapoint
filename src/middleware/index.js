import morgan from "morgan";
import nextConnect from "next-connect";

import database from "./database";

const middleware = nextConnect();

middleware.use(morgan("tiny"));
middleware.use(database);

export default middleware;
