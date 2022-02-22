import { UserModel } from "../../prisma/models";
import { UserCreateInput } from "../../prisma/types";

export async function createUser(params: UserCreateInput) {
  const user = UserModel.create({
    data: params,
    // select: {
    // email: true,
    // name: true,
    // password: true,
    // },
  });
  return user;
}
