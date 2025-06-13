// @ts-nocheck

import { auth } from "../firebase";
import { fetchSavedPosts } from "../services/postService";
import { crearCardPost } from "../components/Cardpost";

class SavedPage extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <section class="saved-page">
        <h1>Posts Guardados</h1>
        <div id="saved-container"></div>
      </section>`;

    const cont = this.querySelector("#saved-container") as HTMLElement;
    const user = auth.currentUser;

    if (!user) {
      cont.innerHTML = "<p>Debes iniciar sesión para ver tus guardados.</p>";
      return;
    }

    // Limpia mientras carga
    cont.innerHTML = "<p>Cargando guardados…</p>";

    try {
      const posts = await fetchSavedPosts(user.uid);
      cont.innerHTML = "";

      if (posts.length === 0) {
        cont.innerHTML = "<p>No tienes posts guardados aún.</p>";
        return;
      }

      posts.forEach(post => {
        const card = crearCardPost(post);
        cont.appendChild(card);
      });
    } catch (e: any) {
      console.error("Error cargando guardados:", e);
      cont.innerHTML = "<p>Error al obtener tus posts guardados.</p>";
    }
  }
}

if (!customElements.get("saved-page")) {
  customElements.define("saved-page", SavedPage);
}

export default SavedPage;