import { store } from "../Flux/Store";
import { CommentActions } from "../Flux/Actions";

export interface Drop {
  username: string;
  verified: string;
  profileImage: string;
  content: string;
  image?: string;
}

export function createDropCard(drop: Drop): HTMLElement {
  const card = document.createElement("div");
  card.className = "drop-card-wrapper";

  const uniqueId = `post-${Math.random().toString(36).substr(2, 9)}`;

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

      .comment-button {
        background: pink !important;
        color: black !important;
        border: none;
        padding: 0;
        cursor: pointer;
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

        .drop-actions {
          display: flex;
          padding-top: 30px;
        }
      }
    </style>

    <div class="drop-card">
      <div class="drop-image-container">
        ${drop.image ? `<img src="${drop.image}" alt="drop image" class="drop-image" />` : ""}
      </div>
      <div class="drop-content">
        <div class="drop-header">
          <img src="${drop.profileImage}" alt="${drop.username}" class="profile-img" />
          <div class="user-info">
            <span class="username">${drop.username}</span>
            <img src="${drop.verified}" alt="verified" class="verified-icon" />
          </div>
        </div>
        <p class="drop-text">${drop.content}</p>

        <div class="drop-actions">
          <button class="comment-button" type="button">
            💬 Comment
          </button>
        </div>
      </div>
    </div>

    <div id="${uniqueId}" class="comments-container">
      <comments-component data-post-id="${uniqueId}"></comments-component>
    </div>
  `;

  const commentButton = card.querySelector(".comment-button") as HTMLButtonElement | null;

  if (commentButton) {
    commentButton.addEventListener("click", () => {
      CommentActions.toggleComments(uniqueId);
    });

    store.subscribe(() => {
      setTimeout(() => {
        const container = card.querySelector(`#${uniqueId}`);
        const visible = store.areCommentsVisible(uniqueId);
        if (container) {
          container.classList.toggle("show", visible);
        }
      }, 0);
    });
  }

  return card;
}