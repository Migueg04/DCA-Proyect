import { store } from "../Flux/Store";
import { CommentActions, LikeActions } from "../Flux/Actions";
import { deletePost, editPost } from "../services/postService";

export interface Drop {
  id: string;
  userId: string;
  username: string;
  verified: string;
  profileImage: string;
  content: string;
  image?: string;
}

export function createDropCard(drop: Drop): HTMLElement {
  const card = document.createElement("div");
  card.className = "drop-card-wrapper";

  const uniqueId = drop.id;
  const currentUser = store.getCurrentUser() as any;

  const profileImage = drop.profileImage ||
    currentUser?.profileimg ||
    "https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg";
  const verifiedSrc =
    drop.verified || "https://cdn-icons-png.flaticon.com/512/5253/5253968.png";
  const imageSrc = drop.image || "";

  card.innerHTML = `
    <style>
      .drop-card-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
      .drop-card {
        display: flex;
        flex-direction: row;
        background: #10062B;
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(255,255,255,0.05);
        gap: 1rem;
        width: 85%;               
        max-width: 800px;        
        align-items: flex-start;
      }
      .drop-image {
        width: 230px;
        height: 230px;
        object-fit: cover;
        border-radius: 12px;
      }
      .drop-content {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .drop-header {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 0.5rem;
      }
      .profile-img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
      }
      .username {
        font-weight: bold;
        color: white;
      }
      .verified-icon {
        width: 16px;
        height: 16px;
      }
      .drop-text {
        font-size: 0.95rem;
        line-height: 1.4;
        color: white;
        margin-bottom: 1rem;
      }
      .drop-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: auto;
      }
      .comment-button, .like-button, .edit-button, .delete-button {
        background: pink;
        color: black;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 8px;
        transition: transform 0.2s;
      }
      .like-button.liked {
        background: #ea3b81;
        color: white;
      }
      .like-button.bounce {
        animation: bounce 0.4s ease;
      }
      @keyframes bounce {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
      }

      
      .comments-container {
        width: 85%;
        max-width: 800px;
        margin: 0 auto;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease, padding 0.4s ease;
        padding: 0;
      }
      .comments-container.show {
        max-height: 500px;
        padding: 1rem 0;
      }

      @media screen and (max-width: 768px) {
        .drop-card {
          flex-direction: column;
          align-items: center;
          width: 95%;
        }
        .drop-image {
          width: 100%;
          height: auto;
        }
        .comments-container {
          width: 95%;
        }
      }
    </style>

    <div class="drop-card">
      <div class="drop-image-container">
        ${imageSrc ? `<img src="${imageSrc}" alt="drop image" class="drop-image"/>` : ""}
      </div>
      <div class="drop-content">
        <div class="drop-header">
          <img src="${profileImage}" alt="${drop.username}" class="profile-img" />
          <span class="username">${drop.username}</span>
          <img src="${verifiedSrc}" alt="verified" class="verified-icon" />
        </div>
        <p class="drop-text">${drop.content}</p>
        <div class="drop-actions">
          <button class="comment-button" type="button">💬 Comment</button>
          <button class="like-button" type="button">❤️ <span class="like-count">0</span></button>
        </div>
      </div>
    </div>

    <div data-post-id="${uniqueId}" class="comments-container">
      <comments-component data-post-id="${uniqueId}"></comments-component>
    </div>
  `;

  
  const commentButton = card.querySelector(".comment-button") as HTMLButtonElement;
  const likeButton = card.querySelector(".like-button") as HTMLButtonElement;
  const likeCount = card.querySelector(".like-count") as HTMLElement;
  commentButton.addEventListener("click", () =>
    CommentActions.toggleComments(uniqueId)
  );
  likeButton.addEventListener("click", () => {
    if (currentUser) {
      LikeActions.toggleLike(uniqueId, currentUser.id);
      likeButton.classList.add("bounce");
      setTimeout(() => likeButton.classList.remove("bounce"), 400);
    }
  });

  store.subscribe(() => {
    const container = card.querySelector(`[data-post-id="${uniqueId}"]`);
    if (container)
      container.classList.toggle(
        "show",
        store.areCommentsVisible(uniqueId)
      );
    likeCount.textContent = store.getLikes(uniqueId).toString();
    if (
      currentUser &&
      store.isPostLikedByUser(uniqueId, currentUser.id)
    ) {
      likeButton.classList.add("liked");
    } else {
      likeButton.classList.remove("liked");
    }
  });

  if (currentUser && currentUser.id === drop.userId) {
    const actionsDiv = card.querySelector(".drop-actions") as HTMLElement;
    const editBtn = document.createElement("button");
    editBtn.className = "edit-button";
    editBtn.textContent = " Edit";
    editBtn.addEventListener("click", async () => {
      const newContent = prompt("Edita tu drop:", drop.content);
      if (newContent?.trim()) {
        try {
          await editPost(drop.id, { content: newContent });
        } catch (e: any) {
          alert("Error editando el post: " + e.message);
        }
      }
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.textContent = " Delete";
    deleteBtn.addEventListener("click", async () => {
      if (confirm("¿Seguro que quieres eliminar este drop?")) {
        try {
          await deletePost(drop.id);
        } catch (e: any) {
          alert("Error eliminando el post: " + e.message);
        }
      }
    });
    actionsDiv.append(editBtn, deleteBtn);
  }

  return card;
}
