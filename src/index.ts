

import { createDropCard } from "./components/dropCard";
import drops from "./data/drops.json";

const container = document.getElementById("drops-container");
if (!container) throw new Error("Contenedor de drops no encontrado");

drops.forEach((drop:any)  => {
  const card = createDropCard(drop);
  container.appendChild(card);
});

