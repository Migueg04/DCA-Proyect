import { store } from "../Flux/Store";
import { CommentActions, LikeActions } from "../Flux/Actions";

export interface Drop {
  id: string;
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
  const profileImage = drop.profileImage || "assets/default-profile.png";
  const verified = drop.verified || "assets/default-verified.png";
  const image = drop.image || "";
  const currentUser = store.getCurrentUser();

  card.innerHTML = `
    <style>
      .drop-card-wrapper {
        width: 70vw;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .drop-card {
        display: flex;
        flex-direction: row;
        background: #10062B;
        color: white;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
        gap: 1rem;
        width: 100%;
        align-items: flex-start;
      }

      .delete-button {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
      }
      .delete-button:hover {
        background: #c0392b;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 5%;
      }

      .drop-image {
        width: 230px;
        height: 230px;
        object-fit: cover;
        border-radius: 12px;
      }

      .drop-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        min-height: 230px;
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
        display: block;
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
      }

      .comment-button, .like-button {
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
        0%   { transform: scale(1); }
        50%  { transform: scale(1.3); }
        100% { transform: scale(1); }
      }

      .drop-actions {
        display: flex;
        gap: 2%;
        padding-top: 30px;
      }

      .comments-container {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease, padding 0.4s ease;
        padding: 0;
        margin-bottom: 0;
      }

      .comments-container.show {
        max-height: 500px;
        padding: 20px 0;
        margin-bottom: 2rem;
      }

      @media screen and (max-width: 768px) {
        .drop-card {
          flex-direction: column;
          align-items: center;
        }

        .drop-image {
          width: 100%;
          height: auto;
        }

        .drop-right {
          width: 100%;
        }
      }
    </style>

    <div class="drop-card">
      <div class="drop-image-container">
        ${image ? `<img src="${image}" alt="drop image" class="drop-image" />` : ""}
      </div>
      <div class="drop-content">
        <div class="drop-header">
          <img src="${profileImage}" alt="${drop.username}" class="profile-img" />
          <div class="user-info">
            <span class="username">${drop.username}</span>
            <img src="${verified}" alt="verified" class="verified-icon" />
          </div>
        </div>
        <p class="drop-text">${drop.content}</p>

        <div class="drop-actions">
          <button class="comment-button" type="button">💬 Comment</button>
          <button class="like-button" type="button">❤️ <span class="like-count">0</span></button>
          ${drop.username === currentUser?.username
          ? `<button class="delete-button" type="button">🗑 Eliminar</button>`
          : ""}
        </div>
      </div>
    </div>

    <div id="${uniqueId}" class="comments-container">
      <comments-component data-post-id="${uniqueId}"></comments-component>
    </div>
  `;

  const commentButton = card.querySelector(".comment-button") as HTMLButtonElement;
  const likeButton = card.querySelector(".like-button") as HTMLButtonElement;
  const likeCount = card.querySelector(".like-count") as HTMLElement;
  const deleteButton = card.querySelector(".delete-button") as HTMLButtonElement | null;

deleteButton?.addEventListener("click", () => {
  const confirmed = confirm("¿Estás segura de eliminar este drop?");
  if (!confirmed) return;

  const currentDrops = JSON.parse(localStorage.getItem("userDrops") || "[]");
  const updatedDrops = currentDrops.filter((d: Drop) => d.id !== drop.id);
  localStorage.setItem("userDrops", JSON.stringify(updatedDrops));
  window.dispatchEvent(new CustomEvent("drop-deleted"));
});


  commentButton.addEventListener("click", () => {
    CommentActions.toggleComments(uniqueId);
  });

  likeButton.addEventListener("click", () => {
    if (currentUser) {
      LikeActions.toggleLike(uniqueId, currentUser.id);
      likeButton.classList.add("bounce");
      setTimeout(() => likeButton.classList.remove("bounce"), 400);
    }
  });

  store.subscribe(() => {
    const visible = store.areCommentsVisible(uniqueId);
    const container = card.querySelector(`#${uniqueId}`);
    if (container) container.classList.toggle("show", visible);

    const likes = store.getLikes(uniqueId);
    likeCount.textContent = likes.toString();

    if (currentUser && store.isPostLikedByUser(uniqueId, currentUser.id)) {
      likeButton.classList.add("liked");
    } else {
      likeButton.classList.remove("liked");
    }
  });

  return card;
}
