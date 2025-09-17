import { Request, Response } from "express";
import { get } from 'http';


const getHomePage = (req: Request, res: Response) => {

    return res.render("home")

}
const getCreateUserPage = (req: Request, res: Response) => {

    return res.render("create-use")

}
const postCreateUserPage = (req: Request, res: Response) => {
    console.log("check req body: ", req.body)
    return res.redirect("/")

}

export { getHomePage, getCreateUserPage, postCreateUserPage };