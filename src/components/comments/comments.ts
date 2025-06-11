import { CommentActions } from "../../Flux/Actions";
import { store } from "../../Flux/Store";

interface Comment {
  postId: string;
  commentId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

class Comments extends HTMLElement {
  private postId: string = "";

  constructor() {
    super();
  }

  connectedCallback() {
    this.postId = this.getAttribute("data-post-id") || this.id || "default";
    this.render();
    this.addListeners();
    store.subscribe(() => {
      this.updateComments();
    });
  }

  addListeners() {
    const button = this.querySelector("button") as HTMLButtonElement | null;
    const input = this.querySelector("#input-comments-textfield") as HTMLInputElement | null;
    const user = store.getCurrentUser();

    if (button && input && user) {
      button.onclick = () => {
        const value = input.value.trim();
        if (value) {
          const newComment: Comment = {
            postId: this.postId,
            commentId: Math.random().toString(36).substring(2),
            userId: user.id,
            username: user.username,
            content: value,
            createdAt: new Date().toISOString(),
          };
          CommentActions.addComment(newComment);
          input.value = "";
          input.focus();
        }
      };
    }
  }

  updateComments() {
    const comments = store.getComments(this.postId);
    const commentsHTML = comments.map(
      (comment) => `
        <div class="username">
          <p>${comment.username}</p>
        </div>
        <div class="message">${comment.content}</div>
      `
    ).join("");

    const container = this.querySelector("#comments");
    if (container) container.innerHTML = commentsHTML || '<p style="color:white">No comments yet</p>';
  }

  render() {
    this.innerHTML = `
      <div id="comments-container">
        <style>
          #comments-container {
            border-radius: 15px;
            max-height: fit-content;
            width: 40vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.05);
            padding: 16px;
          }
          .message {
            margin: 1%;
            margin-bottom: 7%;
            color: #ffffff;
          }
          .username {
            font-weight: bold;
            color: white;
            display: flex;
          }
          #comments {
            width: 80%;
            max-height: fit-content;
            margin-top: 3vh;
            font-family: "Nunito";
          }
          #input-comments {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            width: 100%;
          }
          input {
            height: 56%;
            border: none;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            outline: none;
            font-size: 16px;
            background-color: #ffffff;
            color: #100c2a;
            font-weight: 500;
            width: 75%;
            padding: 10px;
          }
          button {
            background-color: #EA3B81;
            font-family: "Nunito";
            font-weight: bold;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            border: none;
            width: 25%;
            color: white;
            cursor: pointer;
            font-size: 14px;
          }
        </style>
        <div id="comments">
          <p style="color:white">No comments yet</p>
        </div>
        <div id="input-comments">
          <input id="input-comments-textfield" type="text" placeholder="Add a comment...">
          <button>Comment</button>
        </div>
      </div>
    `;
  }
}

export default Comments;