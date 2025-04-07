
interface Drop {
    username: string;
    verified: boolean;
    profileImage: string;
    content: string;
    image?: string;
  }
  
  export function createDropCard(drop: Drop): HTMLElement {
    const card = document.createElement("div");
    card.className = "drop-card";
  
    card.innerHTML = `
      <div class="drop-header">
        <img src="${drop.profileImage}" alt="${drop.username}" class="profile-img" />
        <span class="username">${drop.username}</span>
        <img src="/assets/verified.png" alt="verified" class="verified-icon" />
      </div>
      <p class="drop-text">${drop.content}</p>
      ${drop.image ? `<img src="${drop.image}" alt="drop image" class="drop-image" />` : ""}
    `;
  
    return card;
  }
  