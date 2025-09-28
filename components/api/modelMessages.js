import { deleteItem, getAllItems, createItem, updateItem } from "./client";

const PATH = "messages";

export default class MessagesModel { 

    async getMessagesFromChat(path, chatId) {
        const messages = await getAllItems(PATH + "/" + path + "/" + chatId);
        console.log(messages)
        return messages;
    } 


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