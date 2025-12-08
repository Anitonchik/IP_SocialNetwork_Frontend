import { deleteItem, getAllItems, createItem, updateItem, request} from "./client";

const PATH = "posts";

export default class PostModel { 

    /*async getAll(newPath) {
        let elements;
        if (newPath != null){
            elements = await getAllItems(PATH + "/" + newPath);
        }
        else {
            elements = await getAllItems(PATH);
        }
        
        return elements;
    } */

    async getAll(path) {
        const posts = await request(path)
        return posts;
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
    }
}