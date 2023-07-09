import express, { json } from "express";
import { urlencoded } from "body-parser";
import cors from "cors";

import routes from "../routes";

const app = express();

app.use(cors());
app.use(json({
  limit: '50mb',
  extended: true,
}));
app.use(urlencoded({
  extended: false,
  limit: '50mb',
}));
app.enable('trust proxy');
app.use('/v1', routes);

module.exports = app;