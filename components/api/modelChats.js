import { deleteItem, getAllItems, createItem, updateItem } from "./client";

const PATH = "chats";

export default class ChatsModel { 

    async getAll(newPath, userId) {
        let elements;
        elements = await getAllItems(PATH + "/" + newPath + "/" + userId);
        return elements;
    } 

    async getChat(id) {
        const chat = await getItem(PATH, id);
        return chat;
    }

    async createChat(chatDTO) {
        const chat = await createItem(PATH, chatDTO)
        return chat;
    }

    async updatePost(cgatId, chatDTO) {
        const chat = updateItem(PATH, cgatId, chatDTO)
        return chat;
    }

     async delete(item) {
        const _id = item?.id || item;
        await deleteItem(PATH, _id);
    }
}