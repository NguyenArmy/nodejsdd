import { Request, Response } from "express";
import { get } from "http";
const getDashboardPage = async (req: Request, res: Response) => {

    return res.render("admin/dashboard/show.ejs");

}
const getAdminUserPage = async (req: Request, res: Response) => {

    return res.render("admin/user/show.ejs");

}

export { getDashboardPage, getAdminUserPage };
