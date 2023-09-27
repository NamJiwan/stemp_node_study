//apiRouter.js

import express from "express";
import { getCourseList } from "../controller/courseController";

const apiRouter = express.Router();

apiRouter.get("/course",getCourseList)

export default apiRouter;