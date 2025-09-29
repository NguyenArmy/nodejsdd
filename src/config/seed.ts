import { prisma } from "config/client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if (countUser === 0) {
        await prisma.user.createMany({
            data: [{
                username: "quan",
                password: "123456",
                accountType: "SYSTEM",
            },
            {
                username: "admin",
                password: "123456",
                accountType: "SYSTEM",
            }]
        }
        )
    } else {
        //console.log("Database already seeded")
    };


}
export default initDatabase;