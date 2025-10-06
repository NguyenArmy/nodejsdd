import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {

    const countRole = await prisma.role.count();
    const countUser = await prisma.user.count();


    if (countRole === 0) {
        await prisma.role.createMany({
            data: [{
                username: "ADMIN",
                description: "ADmin thì full quyền"
            },
            {
                username: "USER",

                description: "USER THÔNG THƯỜNG",
            }]
        }
        )
    }
    if (countUser === 0) {
        const defaultPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: { username: "ADMIN" }
        })
        if (adminRole)
            await prisma.user.createMany({
                data: [{
                    fullName: "ADMIN",
                    username: "quan@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole.id
                },
                {
                    fullName: "USER",
                    username: "admin@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole.id
                }]
            }
            )
    }
    if (countRole === 0 && countUser === 0) {
        console.log(">> ALREADY INIT DATA...")
    };


}
export default initDatabase;