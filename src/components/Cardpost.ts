import { guardarPost } from "../services/postService";

export function crearCardPost(post: any): HTMLElement {
  const card = document.createElement("div");
  card.className = "card-post";

  const title = document.createElement("h2");
  title.textContent = post.title;
  card.appendChild(title);

  const desc = document.createElement("p");
  desc.textContent = post.description;
  card.appendChild(desc);

  const btnGuardar = document.createElement("button");
  btnGuardar.textContent = "Guardar";
  btnGuardar.onclick = () => guardarPost(post);
  card.appendChild(btnGuardar);

  return card;
}
