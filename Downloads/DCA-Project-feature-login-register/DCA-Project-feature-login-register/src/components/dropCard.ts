import { Drop } from '../Flux/Store';

export function createDropCard(drop: Drop): HTMLElement {
  const card = document.createElement('div');
  card.className = 'drop-card-wrapper';

  const uniqueId = `comments-${Math.random().toString(36).substr(2, 9)}`;

  card.innerHTML = `
    <style>
      .drop-card-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 70vw;
      }
      .drop-card {
        display: flex;
        flex-direction: row;
        background: #10062B;
        color: #ffffff;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(255,255,255,0.05);
        gap: 1rem;
        width: 100%;
        align-items: flex-start;
      }
      .drop-image {
        width: 230px;
        height: 230px;
        object-fit: cover;
        border-radius: 12px;
      }
      .drop-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .drop-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .profile-img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
      }
      .user-info {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .username {
        font-weight: bold;
      }
      .verified-icon {
        width: 16px;
        height: 16px;
      }
      .drop-text {
        font-size: 0.95rem;
        line-height: 1.4;
        margin-bottom: 1rem;
      }
      .drop-actions {
        display: flex;
        gap: 1rem;
        padding-top: 0.5rem;
      }
      .comment-button {
        background: none;
        border: none;
        cursor: pointer;
      }
      .comments-container {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease, padding 0.4s ease;
      }
      .comments-container.show {
        max-height: 500px;
        padding: 1rem 0;
      }
      @media (max-width: 768px) {
        .drop-card {
          flex-direction: column;
          align-items: center;
        }
        .drop-image {
          width: 100%;
          height: auto;
        }
      }
    </style>

    <div class="drop-card">
      <div class="drop-image-container">
        ${drop.image ? `<img src="${drop.image}" alt="drop image" class="drop-image" />` : ''}
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
          <button class="comment-button"><i class="fa-regular fa-comment fa-xl"></i></button>
          <button class="comment-button"><i class="fa-regular fa-heart fa-xl"></i></button>
          <button class="comment-button"><i class="fa-regular fa-bookmark fa-xl"></i></button>
        </div>
      </div>
    </div>
    <div id="${uniqueId}" class="comments-container">
      <comments-section></comments-section>
    </div>
  `;

  
  const commentBtns = card.querySelectorAll('.comment-button');
  const commentsContainer = card.querySelector(`#${uniqueId}`);
  commentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      commentsContainer?.classList.toggle('show');
    });
  });

  return card;
}