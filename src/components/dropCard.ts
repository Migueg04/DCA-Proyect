interface Drop {
    username: string;
    verified: string;
    profileImage: string;
    content: string;
    image?: string;
  }
  
  export function createDropCard(drop: Drop): HTMLElement {
    const card = document.createElement("div");
    card.className = "drop-card";
  
    card.innerHTML = `
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
      </div>
    `;
  
    return card;
  }
  