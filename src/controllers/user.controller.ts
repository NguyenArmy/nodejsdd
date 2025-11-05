import { Request, Response } from "express";
import { countTotalProductClientPages, getProducts } from "services/client/item.service";
import { getProductWithFilter, userFilter } from "services/client/product.filter";

import { handleCreateUser, handleDeleteUser, getUserById, updateUserById, getAllRoles } from "services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    //get users

    const { page } = req.query;
    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;
    const totalPages = await countTotalProductClientPages(8);
    const products = await getProducts(currentPage, 8);
    return res.render("client/home/show.ejs", {
        products,
        totalPages: +totalPages,
        page: +currentPage
    })

}

const getProductFilterPage = async (req: Request, res: Response) => {
    const { page, factory = "", target = "", price = "", sort = "" } = req.query as {
        page?: string;
        factory: string;
        target: string;
        price: string;
        sort: string;
    }
    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;
    // const totalPage = await countTotalProductClientPages(6);
    // const products = await getProducts(currentPage, 6);
    const data = await getProductWithFilter(currentPage, 6, factory, target, price, sort);
    res.render('client/product/filter.ejs', {
        products: data.products,
        totalPages: +data.totalPages,
        page: +currentPage

    });
}






const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();


    return res.render("admin/user/create.ejs", {
        roles
    })

}
const postCreateUser = async (req: Request, res: Response) => {

    const { fullName, username, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    //handle create user
    await handleCreateUser(fullName, username, address, phone, avatar, role)
    return res.redirect("/admin/user")

}
const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await handleDeleteUser(id);
    return res.redirect("/admin/user")

}
const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    //get user by id
    const user = await getUserById(id);
    const roles = await getAllRoles();
    return res.render("admin/user/detail.ejs", {
        id: id,
        user: user,
        roles
    })


}
const postUpdateUser = async (req: Request, res: Response) => {

    const { id, fullName, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    //update user by id
    await updateUserById(id, fullName, phone, role, address, avatar);
    return res.redirect("/admin/user")



}



export { getHomePage, getCreateUserPage, getProductFilterPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser };