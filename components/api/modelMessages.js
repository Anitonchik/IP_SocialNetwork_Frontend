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

    async updatePost(msgId, messageDTO) {
        alert("редактируется сообщение " + messageDTO.messageText)
        const chat = updateItem(PATH, msgId, messageDTO)
        return chat;
    }

     async delete(id) {
        await deleteItem(PATH, id);
    }
}