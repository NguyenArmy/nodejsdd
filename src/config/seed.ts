import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const defaulPassword = await hashPassword("123456")
    const countRole = await prisma.role.count();
    const countUser = await prisma.user.count();

    
     if(countRole === 0) {
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
    else if (countUser === 0) {
        const defaulPassword = await hashPassword("123456");
        const adminRole = await prisma.role.findFirst({
            where: {username: "ADMIN"}
        })
        if(adminRole)
        await prisma.user.createMany({
            data: [{
                fullName: "ANH QUAN",
                username: "quan@gmail.com",
                password: defaulPassword,
                accountType: ACOUNT_TYPE.SYSTEM,
                roleId: adminRole.id
            },
            {
                fullName: "UYEN HO",
                username: "admin@gmail.com",
                password: defaulPassword,
                accountType: ACOUNT_TYPE.SYSTEM,
                roleId: adminRole.id
            }]
        }
        )
    } 
    else{
        console.log(">> ALREADY INIT DATA...")};


}
export default initDatabase;