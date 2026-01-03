import { deleteItem, getAllItems, getItem, createItem, updateItem, request } from "./client";

const PATH = "chats/";

export default class ChatsModel { 

    async getAll(newPath, userId) {
        let elements;
        //alert(PATH + "/" + newPath + "/" + userId)
        elements = await getAllItems(PATH + newPath + "/" + userId);
        return elements;
    } 

    async getChat(id) {
        const chat = await getItem(PATH + "userschats/" + id);
        return chat;
    }

     async request(path) {
        const responce = await request(path)
        return responce;
     } 

    async getChatOfTwoUsers(userId, otherUserId){
        //alert(PATH + "gd")
        const chat = await getItem(PATH + "userschat/" + userId + "/" + otherUserId)
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

     async delete(id) {
        await deleteItem(PATH, id);
    }
}