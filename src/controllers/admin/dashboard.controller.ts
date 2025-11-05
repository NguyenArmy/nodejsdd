import { Request, Response } from "express";
import { getDashboardInfo } from "services/admin/dashboard.service";
import { countTotalOrder, getOrderAdmin, getOrderDetailAdmin } from "services/admin/order.service";
import { countTotalProduct, getProductList } from "services/admin/product.service";
import { countTotalUser, getAllUsers } from "services/user.service";
const getDashboardPage = async (req: Request, res: Response) => {
    const info = await getDashboardInfo();
    return res.render("admin/dashboard/show.ejs", { info });

}
const getAdminUserPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;


    const users = await getAllUsers(currentPage);
    const totalPages = await countTotalUser();
    return res.render("admin/user/show.ejs", {
        users: users, page: currentPage, totalPages: +totalPages
    });

}



const getAdminProductPage = async (req: Request, res: Response) => {

    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;
    const products = await getProductList(currentPage);
    const totalPages = await countTotalProduct(); //get total pages

    return res.render("admin/product/show.ejs", { products, page: currentPage, totalPages: +totalPages });

}

const getAdminOrderPage = async (req: Request, res: Response) => {
    const { page } = req.query;

    let currentPage = page ? +page : 1;
    if (currentPage <= 0) currentPage = 1;

    const orders = await getOrderAdmin(currentPage);
    const totalPages = await countTotalOrder(); //get total pages

    return res.render("admin/order/show.ejs", { orders, page: currentPage, totalPages: +totalPages });

}
const getOrderAdminDetailPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const orderDetails = await getOrderDetailAdmin(+id);
    return res.render("admin/order/detail.ejs", { id, orderDetails });
}


export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getOrderAdminDetailPage };
