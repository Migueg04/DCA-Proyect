// @ts-nocheck

// src/components/Cardpost.ts
import { store } from "../Flux/Store";
import { fetchSavedPosts, guardarPost, SavedPost } from "../services/postService";

/**
 * Crea y retorna una card de post con funcionalidad de guardado,
 * que mantiene el botón en estado "✅ Guardado" si ya está en Firestore.
 */
export function crearCardPost(post: { id: string; title: string; description: string }): HTMLElement {
  const card = document.createElement("div");
  card.className = "card-post";

  // Título
  const title = document.createElement("h2");
  title.textContent = post.title;
  card.appendChild(title);

  // Descripción
  const desc = document.createElement("p");
  desc.textContent = post.description;
  card.appendChild(desc);

  // Botón Guardar
  const btnGuardar = document.createElement("button");
  btnGuardar.className = "save-button";
  btnGuardar.textContent = "🔖 Guardar";
  card.appendChild(btnGuardar);

  // Chequear si el post ya está guardado
  async function initSavedState() {
    const currentUser = store.getCurrentUser() as any;
    if (!currentUser) return;
    try {
      const saved: SavedPost[] = await fetchSavedPosts(currentUser.id);
      const already = saved.some((sp) => sp.id === post.id);
      if (already) {
        btnGuardar.textContent = "✅ Guardado";
        btnGuardar.disabled = true;
      }
    } catch (e) {
      console.error("Error fetchSavedPosts:", e);
    }
  }
  initSavedState();

  // Evento click para guardar
  btnGuardar.addEventListener("click", async () => {
    const currentUser = store.getCurrentUser() as any;
    if (!currentUser) {
      alert("Debes iniciar sesión para guardar posts.");
      return;
    }
    try {
      await guardarPost(post, currentUser.id);
      btnGuardar.textContent = "✅ Guardado";
      btnGuardar.disabled = true;
    } catch (err: any) {
      alert("Error al guardar el post: " + err.message);
    }
  });

  return card;
}
