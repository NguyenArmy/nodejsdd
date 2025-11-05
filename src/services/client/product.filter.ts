import { prisma } from "config/client";

const userFilter = async (usernameInput: string) => {
    return await prisma.user.findMany({
        where: {
            username: {
                contains: usernameInput
            }
        }

    })
};
const getProductWithFilter = async (
    page: number,
    pageSize: number,
    factory: string,
    target: string,
    price: string,
    sort: string) => {
    let whereClause: any = {};
    if (factory) {
        const factoryInput = factory.split(",")
        whereClause.factory = {

            in: factoryInput

        }
    }
    // whereClause = {
    //     factory:{...}
    // }
    if (target) {
        const targetInput = target.split(",")
        whereClause.target = {

            in: targetInput

        }
    }

    // whereClause = {
    //     factory:{...},
    //     target:{...}
    // }
    if (price) {
        const priceInput = price.split(",");
        //["duoi-10-trieu","10-15-trieu", "15-20-trieu","tren-20-trieu"]
        const priceCondition = [];
        for (let i = 0; i <= priceInput.length; i++) {
            if (priceInput[i] === "duoi-10-trieu") {
                priceCondition.push({ "price": { "lt": 10000000 } })
            }
            if (priceInput[i] === "10-15-trieu") {
                priceCondition.push({ "price": { "gte": 10000000, "lt": 15000000 } })
            }
            if (priceInput[i] === "15-20-trieu") {
                priceCondition.push({ "price": { "gte": 15000000, "lt": 20000000 } })
            }
            if (priceInput[i] === "tren-20-trieu") {
                priceCondition.push({ "price": { "gte": 20000000 } })
            }
        }
        whereClause.OR = priceCondition

    }
    let orderByClause: any = {};

    if (sort === "gia-tang-dan") {
        orderByClause = {
            price: "asc"
        }

    }


    if (sort === "gia-giam-dan") {
        orderByClause = {
            price: "desc"
        }

    }

    const skip = pageSize * (page - 1);
    const [products, count] = await prisma.$transaction([
        prisma.product.findMany({
            where: whereClause,
            skip: skip,
            take: pageSize,
            orderBy: orderByClause
        }),
        prisma.product.count({ where: whereClause })
    ])
    const totalPages = Math.ceil(count / pageSize);
    return { products, totalPages };
}

export { userFilter, getProductWithFilter };