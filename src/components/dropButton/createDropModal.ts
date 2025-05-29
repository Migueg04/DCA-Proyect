class CreateDropModal extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  setupEvents() {
    const dropBtn = this.shadow.querySelector('#dropBtn') as HTMLButtonElement;
    const textarea = this.shadow.querySelector('#drop-text') as HTMLTextAreaElement;
    const closeBtn = this.shadow.querySelector('#closeBtn') as HTMLButtonElement;
    const imgInput = this.shadow.querySelector('#imgUpload') as HTMLInputElement;

    dropBtn?.addEventListener('click', () => {
      const content = textarea?.value.trim();
      const imageFile = imgInput?.files?.[0];

      if (!content) return alert('Tu drop está vacío');

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result?.toString() || '';
        const newDrop = {
          username: 'PlayerOne',
          verified: 'https://cdn-icons-png.flaticon.com/512/5253/5253968.png',
          profileImage: 'https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg',
          content,
          image: imageFile ? imageUrl : ''
        };

        const oldDrops = JSON.parse(localStorage.getItem('userDrops') || '[]');
        localStorage.setItem('userDrops', JSON.stringify([newDrop, ...oldDrops]));
        window.dispatchEvent(new CustomEvent('drop-added'));
        this.remove();
      };

      if (imageFile) {
  reader.readAsDataURL(imageFile);
} else {
  const imageUrl = '';
  const newDrop = {
    username: 'PlayerOne',
    verified: 'https://cdn-icons-png.flaticon.com/512/5253/5253968.png',
    profileImage: 'https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg',
    content,
    image: imageUrl
  };

  const oldDrops = JSON.parse(localStorage.getItem('userDrops') || '[]');
  localStorage.setItem('userDrops', JSON.stringify([newDrop, ...oldDrops]));
  window.dispatchEvent(new CustomEvent('drop-added'));
  this.remove();
}

    });

    closeBtn?.addEventListener('click', () => this.remove());
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .modal {
          background: #1a1035;
          border-radius: 20px;
          padding: 1.5rem;
          width: 90vw;
          max-width: 600px;
          color: white;
          position: relative;
        }

        textarea {
          width: 100%;
          height: 150px;
          resize: none;
          font-family: 'Nunito', sans-serif;
          font-size: 1rem;
          padding: 1rem;
          border-radius: 12px;
          background: #ffffff33;
          color: white;
          border: none;
          margin-top: 1rem;
        }

        #dropBtn {
          margin-top: 1rem;
          float: right;
          background-color: #ea3b81;
          color: white;
          padding: 0.5rem 1.2rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        #closeBtn {
          position: absolute;
          top: 10px;
          left: 15px;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: white;
          cursor: pointer;
        }

        .img-upload {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      </style>
      <div class="overlay">
        <div class="modal">
          <button id="closeBtn">&times;</button>
          <div class="profile">
            <img src="https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg" style="width: 50px; height: 50px; border-radius: 50%;" />
          </div>
          <textarea id="drop-text" placeholder="¿Qué estás pensando?"></textarea>
          <div class="img-upload">
            <label>
              <input type="file" accept="image/*" id="imgUpload" style="display: none;" />
              <img src="https://img.icons8.com/ios-filled/50/image.png" width="28" style="cursor:pointer;" />
            </label>
            <button disabled>GIF</button>
          </div>
          <button id="dropBtn">Drop!</button>
        </div>
      </div>
    `;
  }
}

customElements.define('create-drop-modal', CreateDropModal);
export default CreateDropModal;