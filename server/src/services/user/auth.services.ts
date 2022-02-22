import { UserCreateInput } from "../../@types/prisma/static.types";
import { UserModel } from "../../prisma/models";

export async function createUser(input: UserCreateInput) {
    const user = UserModel.create({
        data: input,
        // select: {
        // email: true,
        // name: true,
        // password: true,
        // },
    });
    return user;
}
