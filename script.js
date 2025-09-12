import PostController from './components/post/controller.js';
//import UserPostsController from './components/post/userController.js';

const textareaURLInput = document.getElementById("url-input");
const textareaTextInput = document.getElementById("text-input");
const textareasPost = document.querySelector('.adding-post-textareas');

document.addEventListener("DOMContentLoaded", () => {
    const userSettings = { userId: 1 };
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
    alert(usertSetting- {userId})
});

//блок с кнопками обновления и отмегы
const updatePost = document.querySelector('.update-post-button');


document.addEventListener("DOMContentLoaded", () => {
    const controller = new PostController(1, false);
    controller.loadPosts(1);
});

/*document.addEventListener("DOMContentLoaded", () => {
    const controller = new UserPostsController(1);
    controller.loadPosts();
});*/

function showTextareas() {
    //textareasPost.classList.add('show');
    textareasPost.style.display = "flex";
}

//кнопка лайка
/*document.addEventListener("DOMContentLoaded", function () {
    const likeButton = document.getElementById("like")
    likeButton.addEventListener("click", function (e) {
        const icon = document.getElementById("iconLike");
        icon.style.color = "#ffa07a";
    });
})*/


//кнопка создания поста
document.addEventListener("DOMContentLoaded", function () {
    const createPostButton = document.getElementById("createPostButton")
    createPostButton.addEventListener("click", function (e) {

        const addPost = document.querySelector('.adding-post-button');
        
        
        addPost.classList.toggle('show');
        textareasPost.classList.toggle('show');
    });
})


//нлпка добавления поста
document.addEventListener("DOMContentLoaded", function () {
    const addPostButton = document.getElementById("addPostButton");
    addPostButton.addEventListener("click", function (e) {
        
        const controller = new PostController(1, false);
        controller.createPost(textareaURLInput.value.trim(), textareaTextInput.value.trim())
    });
})

let postControllerForUpdate = new PostController(); //вспомогательная переменная для передачи объекта контроллера при нажатии кнопки
let postId;

//кнопка редактирования поста
document.addEventListener("DOMContentLoaded", function () {
    const enterUpdatePostButton = document.getElementById("enterUpdatePostButton");
    enterUpdatePostButton.addEventListener("click", function () {
        const url = textareaURLInput.value.trim();
        const text = textareaTextInput.value.trim();
        
        postControllerForUpdate.updatePost(postId, url, text);

        textareaURLInput.value = "";
        textareaTextInput.value = "";
        textareasPost.classList.remove('.show');
        updatePost.classList.remove('.show');
    });
})

//кнопка отмены редактирования поста
document.addEventListener("DOMContentLoaded", function () {
    const cancelUpdatePostButton = document.getElementById("cancelUpdatePostButton");
    cancelUpdatePostButton.addEventListener("click", function (e) {

        textareasPost.style.display = "none";
        updatePost.style.display = "none";

        textareaURLInput.value = ""
        textareaTextInput.value = ""
    });
})

/*function takeDataToUpdatePostInTextarea(postController, id, url, text) {
    showTextareas();

    postControllerForUpdate = postController;
    postId = id;

    textareaURLInput.textContent = url;
    textareaTextInput.textContent = text;

    
    updatePost.classList.add('show');
}*/

export {takeDataToUpdatePostInTextarea}; 

/*const commentButtons = document.querySelectorAll('.comment-button');
if (!commentButtons) {
    alert("commentButtons is null")
}
commentButtons.forEach(button => {
    button.addEventListener('click', function() {
    const post = button.closest('.post');
    const comments = post.querySelector('.comments');
    comments.classList.toggle('show');
    });
});
  
/*добавление комментария*/
/*document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.querySelector(".send-comment-button button");
    const textarea = document.getElementById("comment-textarea");
    const commentInputBlock = document.getElementById("enter-comment");

    sendButton.addEventListener("click", function (e) {
        e.preventDefault();

        const commentText = textarea.value.trim();
        if (commentText === "") return;

        // Создание корневого блока комментария
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        // Автор комментария
        const authorDiv = document.createElement("div");
        authorDiv.classList.add("comment-author");

        const avatar = document.createElement("img");
        avatar.classList.add("profile");
        avatar.src = "profile/ava2.jpg";
        avatar.alt = "avatar";

        const authorName = document.createElement("div");
        authorName.classList.add("main-text");
        authorName.textContent = "some.profile";

        authorDiv.appendChild(avatar);
        authorDiv.appendChild(authorName);

        // Блок с текстом комментария и временем
        const blockDiv = document.createElement("div");
        blockDiv.classList.add("comment-block");

        const commentTextDiv = document.createElement("div");
        commentTextDiv.classList.add("comment-text");
        commentTextDiv.textContent = commentText;

        const commentDateDiv = document.createElement("div");
        commentDateDiv.classList.add("comment-date");
        commentDateDiv.textContent = getCurrentTime();

        blockDiv.appendChild(commentTextDiv);
        blockDiv.appendChild(commentDateDiv);

        // Сборка финального комментария
        commentDiv.appendChild(authorDiv);
        commentDiv.appendChild(blockDiv);

        // Вставка в DOM перед формой
        commentInputBlock.parentNode.insertBefore(commentDiv, commentInputBlock);

        textarea.value = ""; // очистить поле
    });    
});

/*прокурутка к последнему сообщению*/
/*const messagesBlock = document.getElementById("messages-block");
messagesBlock.scrollTop = messagesBlock.scrollHeight;

/*отправка сообщения*/
/*document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("message-textarea");
    const messageInputBlock = document.getElementById("messages-block");

    sendMessageButton.addEventListener("click", function (e) {
        e.preventDefault();

        const messageText = textarea.value.trim();
        if (messageText === "") return;

        // Создание корневого блока комментария
        const yourMessageDiv = document.createElement("div");
        yourMessageDiv.classList.add("d-block");
        yourMessageDiv.classList.add("your-message");

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message-chat-text");
        messageDiv.textContent = messageText;

        const messageTimeDiv = document.createElement("div");
        messageTimeDiv.classList.add("message-chat-time");
        messageTimeDiv.textContent = getCurrentTimeForMessage();

        yourMessageDiv.appendChild(messageDiv);
        yourMessageDiv.appendChild(messageTimeDiv);

        messageInputBlock.appendChild(yourMessageDiv);

        textarea.value = ""; // очистить поле
    });
}); 

const textarea = document.getElementById('message-textarea');
const sendMessageButton = document.getElementById('send-message-button');

    textarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessageButton.click();
            messagesBlock.scrollTop = messagesBlock.scrollHeight;
        }
    });

function getCurrentTime() {
        const now = new Date();
        const day = now.getDate().toString();
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const month = months[now.getMonth()];
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${day} ${month}, ${hours}:${minutes}`;
    }

function getCurrentTimeForMessage() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}*/

