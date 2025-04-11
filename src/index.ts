import './components/trendingPanel';

import Comments from "./components/comments/comments";
import Button from "./components/dropButton/dropButton";
import Section from "./components/comments/sectionComments";

customElements.define("comments-component", Comments);
customElements.define("button-component", Button);
customElements.define("section-component", Section);

import './components/Sidebar';
import './components/searchbar';
import './components/mainFeed'; 