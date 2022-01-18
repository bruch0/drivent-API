import "@/setup";

import express from "express";
import "express-async-errors";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "@/database";
import errorHandlingMiddleware from "@/middlewares/errorHandlingMiddleware";
import router from "@/routers";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.send("OK!");
});

app.use(router);
app.use(errorHandlingMiddleware);

export async function init() {
  await connectDatabase();
}

export default app;
