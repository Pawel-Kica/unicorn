import { UsersRelationModel } from "../prisma/models";
import { UsersRelationCreateInput, UsersRelationWhereInput } from "../@types/prisma/static.types";

export async function createUsersRelations(data: UsersRelationCreateInput) {
    await UsersRelationModel.create({ data });
}

export async function findUsersRelation(where: UsersRelationWhereInput) {
    const usersRelation = await UsersRelationModel.findFirst({ where });
    return usersRelation;
}

export async function deleteManyUsersRelation(where: UsersRelationWhereInput) {
    await UsersRelationModel.deleteMany({ where });
}
