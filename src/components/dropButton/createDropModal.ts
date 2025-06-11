import { store } from "../../Flux/Store";
import { createPost } from "../../services/postService";

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

    closeBtn?.addEventListener('click', () => this.remove());

    dropBtn?.addEventListener('click', () => {
      const content = textarea.value.trim();
      if (!content) return alert('Tu drop está vacío');

      const currentUser = store.getCurrentUser();
      if (!currentUser) {
        alert('Debes iniciar sesión para publicar.');
        return;
      }

      const imageFile = imgInput.files?.[0];
      const handlePost = async (imageUrl: string) => {
        try {
          await createPost(
            currentUser.id,
            currentUser.username,
            content,
            imageUrl
          );
          window.dispatchEvent(new CustomEvent('drop-added'));
          this.remove();
        } catch (err: any) {
          console.error('Error creando post:', err);
          alert('No se pudo crear el post: ' + err.message);
        }
      };

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => {
          handlePost(reader.result?.toString() || '');
        };
        reader.readAsDataURL(imageFile);
      } else {
        handlePost('');
      }
    });
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        
        :host {
          position: fixed;
          inset: 0;
          display: block;
          z-index: 10000;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.7);
        }
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #1a1035;
          border-radius: 20px;
          padding: 1.5rem;
          width: 90vw;
          max-width: 550px;
          color: white;
          box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        textarea {
          width: 97%;
          height: 100px;
          resize: none;
          font-family: 'Nunito', sans-serif;
          font-size: 1rem;
          padding: 1rem;
          border-radius: 12px;
          background: #ffffff33;
          color: white;
          border: none;
          margin-bottom: 1rem;
        }
        #dropBtn {
          background-color: #ea3b81;
          color: white;
          padding: 0.5rem 1.2rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          float: right;
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
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .img-upload img {
          cursor: pointer;
        }
        @media (max-width: 480px) {
          .modal {
            padding: 1rem;
            width: 92vw;
            max-width: 92vw;
          }
          textarea {
            height: 120px;
          }
          #dropBtn {
            width: 100%;
            float: none;
            padding: 0.6rem;
            font-size: 1rem;
            border-radius: 10px;
          }
        }
      </style>
      <div class="overlay"></div>
      <div class="modal">
        <button id="closeBtn">&times;</button>
        <textarea id="drop-text" placeholder="¿Qué estás pensando?"></textarea>
        <div class="img-upload">
          <label>
            <input type="file" accept="image/*" id="imgUpload" style="display: none;" />
            <img src="https://img.icons8.com/ios-filled/50/image.png" width="28" />
          </label>
          <button disabled>GIF</button>
        </div>
        <button id="dropBtn">Drop!</button>
      </div>
    `;
  }
}

customElements.define('create-drop-modal', CreateDropModal);
export default CreateDropModal;
