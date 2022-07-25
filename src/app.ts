import express, { json } from "express";
import "express-async-errors";

import router from "./routes/index.js";
import { handleError } from "./middlewares/handleError.js";

const app = express();

app.use(json());
app.use(router);
app.use(handleError);

export default app

