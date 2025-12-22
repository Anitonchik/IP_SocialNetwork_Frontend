import { ConeStriped } from "react-bootstrap-icons";
import { deleteItem, getAllItems, getItem, createItem, updateItem, request } from "./client";

const PATH = "users/";

export default class UserModel { 

    async getUser(id) {
        let d = await getItem(PATH + id);
        return d;
    } 

    async getUsers(path) {
        return await request(path);
    } 

    async isSubscribed(id, subscribedUserId) {
        return await getItem(PATH + "subscription/" + id + "/" + subscribedUserId);
    } 

    async createUser(userDTO) {
        const user = await createItem(PATH, userDTO)
        return user;
    }

    async createSubscription(id, userFollowingId) {
        const subscribe = await updateItem(PATH + id + "/" + userFollowingId);
        return subscribe;
    }

    async deleteSubscription(id, userFollowingId) {
        return await deleteItem(PATH + "subscription/" + id + "/" + userFollowingId);
        
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