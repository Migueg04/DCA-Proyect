import { createDropCard, Drop } from "./dropCard";
import { subscribePosts } from "../services/postService";
import { store } from "../Flux/Store";

class MainFeed extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
   
    subscribePosts((rawPosts) => {
     
      const drops: Drop[] = rawPosts.map((p) => ({
        id: p.id,
        userId: p.userId,
        username: p.username,
        verified: "",       
        profileImage: "",   
        content: p.content,
        image: p.image
      }));
      this.render(drops);
    });
  }

  render(drops: Drop[]) {
    
    const container = document.createElement("div");
    container.className = "main-feed-container";

   
    drops.forEach((drop) => {
      const card = createDropCard(drop);
      container.appendChild(card);
    });

   
    this.shadow.innerHTML = "";
    this.shadow.appendChild(container);
  }
}

customElements.define("main-feed", MainFeed);
export default MainFeed;
