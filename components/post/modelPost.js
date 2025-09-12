import { deleteItem, getAllItems, createItem, updateItem } from "../api/client";
import { lsReadArray, lsSave } from "../storage";

const PATH = "posts";

export default class PostModel { 
    constructor() {
        this.data = [];
    }

    async getAll(newPath) {
        let elements;
        if (newPath != null){
            elements = await getAllItems(PATH + "/" + newPath);
        }
        else {
            elements = await getAllItems(PATH);
        }
        
        this.data = elements.map((post) => ({
            ...post
        }));
        return this.data;
    } 

    async createPost(postDTO) {
        const post = await createItem(PATH, postDTO)
        return post;
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