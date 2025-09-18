import { deleteItem, getAllItems, getItem, createItem, updateItem } from "./client";

const PATH = "users/";

export default class UserModel { 

    async getUser(id) {
        let d = await getItem(PATH + id);
        return d;
    } 

    async createUser(userDTO) {
        const user = await createItem(PATH, userDTO)
        return user;
    }

    async updatePost(postId, postDTO) {
        const post = updateItem(PATH, postId, postDTO)
        return post;
    }

     async delete(item) {
        const _id = item?.id || item;
        await deleteItem(PATH, _id);
    }
}