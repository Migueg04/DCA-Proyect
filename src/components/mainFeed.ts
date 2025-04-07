import { createDropCard } from "./dropCard";
import drops from "../data/drops.json"; 

interface Drop {
    username: string;
    verified: boolean;
    profileImage: string;
    content: string;
    image?: string;
}

const container = document.getElementById("drops-container");
if (!container) throw new Error("Contenedor de drops no encontrado");

drops.forEach((drop: Drop) => {
  const card = createDropCard(drop);
  container.appendChild(card);
});
