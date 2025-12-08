import { deleteItem, getAllItems, getItem, createItem, updateItem } from "./client";

const PATH = "users/";

export default class UserModel { 

    async getUser(id) {
        let d = await getItem(PATH + id);
        return d;
    } 

    async getFollowers(id) {
        return await getItem(PATH + "followers/" + id);
    } 

    async getSubscriptions(id) {
        return await getItem(PATH + "subscriptions/" + id);
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