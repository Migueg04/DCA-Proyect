// src/components/dropCard.ts

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

  const uniqueId = `comments-${Math.random().toString(36).substr(2, 9)}`;

  card.innerHTML = `
    <style>
      .drop-card-wrapper {
        width: 70vw;
        max-width: 900px;
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

      .drop-actions {
        display: flex;
        gap: 2%;
        padding-top: 30px;
      }

      .comment-button {
        background: none;
        border: none;
        padding: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        transition: background 0.2s ease;
      }

      .comment-button:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .comments-container {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease, padding 0.4s ease;
        padding: 0 0;
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
          <button class="comment-button" data-action="toggle-comments" type="button" title="Ver comentarios">
            <i class="fa-regular fa-comment fa-xl" style="color: #ffffff;"></i>
          </button>
          <button class="comment-button" type="button">
            <i class="fa-regular fa-heart fa-xl" style="color: #ffffff;"></i>
          </button>
          <button class="comment-button" type="button">
            <i id="bookmarkIcon" class="fa-regular fa-bookmark fa-xl" style="color: #ffffff; cursor: pointer;"></i>
          </button>
        </div>
      </div>
    </div>

    <div id="${uniqueId}" class="comments-container">
      <comments-component></comments-component>
    </div>
  `;

  const toggleButton = card.querySelector('[data-action="toggle-comments"]');
  const commentsContainer = card.querySelector(`#${uniqueId}`);

  if (toggleButton && commentsContainer) {
    let commentsVisible = false;
    toggleButton.addEventListener("click", () => {
      commentsVisible = !commentsVisible;
      commentsContainer.classList.toggle("show", commentsVisible);
    });
  }

  return card;
}
