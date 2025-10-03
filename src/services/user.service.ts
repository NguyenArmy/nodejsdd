import { prisma } from "config/client";
import { ACOUNT_TYPE } from "config/constant";

import bcrypt from 'bcrypt';
const saltRounds= 10;
const hashPassword = async (plainText: string) =>{
    return await bcrypt.hash(plainText, saltRounds)
}
const handleCreateUser = async (
    fullName: string,
    email: string,
    address: string,
    phone: string,
    role: string,
avatar: string
) => {
    const defaulPassword = await hashPassword("123456")
    // insert into database
    const newUser = await prisma.user.create({
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: defaulPassword,
            accountType: ACOUNT_TYPE.SYSTEM,
            avatar: avatar,
            phone: phone,
            roleId: +role,

        }
    })
    return newUser;



};
const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;


}
const getAllRoles = async () => {
    const roles = await prisma.role.findMany();
    return roles;


}
const handleDeleteUser = async (id: string) => {
    await prisma.user.delete({ where: { id: +id } });
}
const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id: +id } });

    return user;
};
const updateUserById = async (id: string,
    email: string, address: string, fullName: string
) => {
    const updatedUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName: fullName,
            username: email,
            address: address,
            password: "",
            accountType: ""
        }
    })
    return updatedUser;

}


export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles, hashPassword }
