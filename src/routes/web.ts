import express, { Express } from "express";
import { get } from "http";
import { getCreateUserPage, getHomePage, postCreateUserPage } from "../controllers/user.controller";
const router = express.Router();

const webRouter = (app: Express) => {
    router.get("/", getHomePage);
    router.get("/create-user", getCreateUserPage);
    router.post("/handle-create-user", postCreateUserPage);



    app.use("/", router);
}

export default webRouter;