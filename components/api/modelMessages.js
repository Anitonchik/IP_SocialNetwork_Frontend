import { deleteItem, getAllItems, createItem, updateItem } from "./client";

const PATH = "messages";

export default class MessagesModel { 


    async createMessage(messageDTO) {
        const message = await createItem(PATH, messageDTO)
        return message;
    }

    /*async updatePost(cgatId, chatDTO) {
        const chat = updateItem(PATH, cgatId, chatDTO)
        return chat;
    }*/

     async delete(item) {
        const _id = item?.id || item;
        await deleteItem(PATH, _id);
    }
}