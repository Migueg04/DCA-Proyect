import Navigate from "../utils/Navigate";

class EditProfileButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    
    const style = document.createElement("style");
    style.textContent = `
      @media (max-width: 768px) {
        .button-wrapper {s
          flex-direction: column;
        }
      }

      .button-wrapper {
        display: flex;
        align-items: center;
      }

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: #FFD02E;
        color: black;
        border: none;
        border-radius: 20px;
        padding: 10px 16px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        font-family: sans-serif;
      }

      button:hover {
        filter: brightness(0.95);
      }

      .icon {
        font-size: 18px;
      }
    `;

  
    const wrapper = document.createElement("div");
    wrapper.className = "button-wrapper";

    const button = document.createElement("button");
    button.innerHTML = `<span class="icon">⚙️</span>Edit profile`;
    button.addEventListener("click", (e) => {
      e.preventDefault();
      Navigate("/Editprofile");
    });

    // 3️⃣ Montar en shadow DOM
    wrapper.append(button);
    shadow.append(style, wrapper);
  }
}

customElements.define("edit-profile-button", EditProfileButton);
export default EditProfileButton;
