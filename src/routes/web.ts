import express, { Express } from "express";

import { getCreateUserPage, getHomePage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser } from "controllers/user.controller";
import { getAdminUserPage, getDashboardPage, getAdminProductPage, getAdminOrderPage } from "controllers/admin/dashboard.controller";
const router = express.Router();

const webRouter = (app: Express) => {
    router.get("/", getHomePage);

    router.post("/handle-create-user", postCreateUserPage);
    router.post("/handle-delete-user/:id", postDeleteUser);
    router.get("/handle-view-user/:id", getViewUser);
    router.post("/handle-update-user", postUpdateUser);
    //admin routes
    router.get("/admin", getDashboardPage);
    router.get("/admin/user", getAdminUserPage);

    router.get("/admin/create-user", getCreateUserPage);


    router.get("/admin/product", getAdminProductPage);
    router.get("/admin/order", getAdminOrderPage);

    app.use("/", router);
}

export default webRouter;