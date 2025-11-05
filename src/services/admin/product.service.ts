import { prisma } from "config/client"
import { TOTAL_ITEM_PER_PAGE } from "config/constant";
const createProduct = async (
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload: string) => {
    await prisma.product.create({
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload })
        }
    })
}
const getProductList = async (page: number) => {
    const skip = (page - 1) * TOTAL_ITEM_PER_PAGE;
    const take = TOTAL_ITEM_PER_PAGE;
    const products = await prisma.product.findMany({
        skip,
        take
    });
    return products;

}

const handleDeleteProduct = async (id: number) => {
    await prisma.product.delete({
        where: {
            id
        }
    })

}
const getProductById = async (id: number) => {
    return await prisma.product.findUnique({
        where: {
            id
        }
    })
}
const updateProductById = async (
    id: number,
    name: string,
    price: number,
    detailDesc: string,
    shortDesc: string,
    quantity: number,
    factory: string,
    target: string,
    imageUpload?: string) => {
    await prisma.product.update({
        where: {
            id
        },
        data: {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target,
            ...(imageUpload && { image: imageUpload })
        }
    })
}
const countTotalProduct = async () => {
    const totalItems = await prisma.product.count();
    const pageSize = TOTAL_ITEM_PER_PAGE;

    const totalPages = Math.ceil(totalItems / pageSize);
    return totalPages;
}

export { createProduct, getProductList, handleDeleteProduct, getProductById, updateProductById, countTotalProduct };