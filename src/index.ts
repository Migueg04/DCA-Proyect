import './components/trendingPanel';

import Comments from "./components/comments/comments";
import Button from "./components/dropButton/dropButton";
import Section from "./components/comments/sectionComments"

customElements.define("comments-component", Comments)
customElements.define("button-component", Button)
customElements.define("section-component", Section)



import { createDropCard } from "./components/dropCard";
import drops from "./data/drops.json";
import type { Drop } from "./components/dropCard";

const container = document.getElementById("drops-container");
if (!container) throw new Error("Contenedor de drops no encontrado");

(drops as Drop[]).forEach((drop) => {
  const card = createDropCard(drop);
  container.appendChild(card);
});

