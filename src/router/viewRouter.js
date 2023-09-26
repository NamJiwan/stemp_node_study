//viewRouter.js

import express from "express";
import {
  courseViewController,
  homeViewController,
  introduceViewController,
  joinController,
  loginController,
  profileController,
  qrController,
} from "../controller/viewcontroller";

const viewRouter = express.Router();

viewRouter.get("/login", loginController);
viewRouter.get("/join", joinController);
viewRouter.get("/profile", profileController);
viewRouter.get("/qr", qrController);
viewRouter.get("/course", courseViewController);
viewRouter.get("/", homeViewController);
viewRouter.get("/introduce", introduceViewController);

export default viewRouter;
