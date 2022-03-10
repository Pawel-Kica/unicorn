import { ConversationCreateInput, ConversationUpdateInput, ConversationWhereUniqueInput } from "../@types/prisma/static.types";
import { ConversationModel } from "../prisma/models";

export async function createConversation(data: ConversationCreateInput) {
    const conversation = await ConversationModel.create({
        data,
        include: {
            messages: true,
        },
    });
    return conversation;
}

export async function findUserConversation(conversationId: string, userId: string) {
    const conversation = await ConversationModel.findFirst({
        where: {
            id: conversationId,
            members: {
                some: {
                    id: userId,
                },
            },
        },
    });
    return conversation;
}

export async function updateUniqueConversation(where: ConversationWhereUniqueInput, data: ConversationUpdateInput) {
    const conversation = await ConversationModel.update({ where, data });
    return conversation;
}