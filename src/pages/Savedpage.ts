import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export async function mostrarPostsGuardados(containerId: string) {
  const contenedor = document.getElementById(containerId);
  if (!contenedor) return;

  const snapshot = await getDocs(collection(db, "posts_guardados"));

  snapshot.forEach((doc) => {
    const data = doc.data();

    const card = document.createElement("div");
    card.className = "post-guardado";

    const title = document.createElement("h2");
    title.textContent = data.title;
    card.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = data.description;
    card.appendChild(desc);

    contenedor.appendChild(card);
  });
}
