
import './components/trendingPanel';
import { createDropCard } from "./components/dropCard";
import drops from "./data/drops.json";
import { Drop } from "./types/types";

const container = document.getElementById("drops-container");
if (!container) throw new Error("Contenedor de drops no encontrado");

drops.forEach((drop:Drop)  => {
  const card = createDropCard(drop);
  container.appendChild(card);
});

