import { deleteItem, getAllItems, getItem, createItem, updateItem } from "../api/client";
import { lsReadArray, lsSave } from "../storage";

const PATH = "users/";

export default class UserModel { 
    constructor() {
        this.data = [];
    }

    async getUser(id) {
        let d = await getItem(PATH + id);
        //alert(JSON.stringify(d))
        return d;
    } 

    /*async getAllByUser(userId) {
        const elements = await getAllItems(PATH, `d=${userId}`);
        this.data = elements.map((post) => ({
            ...post,
            comments: post.comments || []
        }));
        return this.data;
    } */

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

        // Также удаляем из локального массива
        this.data = this.data.filter(p => p.id != _id);
    }

    // Сохраняем посты в localStorage (если надо)
    saveToLocalStorage() {
        lsSave(PATH, this.data);
    }

    // Загружаем посты из localStorage
    loadFromLocalStorage() {
        this.data = lsReadArray(PATH);
    }
}