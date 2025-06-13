
import Root from "./components/root/root";
import Comments from "./components/comments/comments";
import Button from "./components/dropButton/dropButton";
import Section from "./components/comments/sectionComments";
import './components/trendingPanel/trendingPanel';

import './components/Sidebar';
import './components/searchbar';
import './components/mainFeed';
import MainPage from "./pages/mainPage";
import ProfilePage from "./pages/profilePage";
import ProfileCard from "./components/profilePage/profilecard";
import AuthContainer from "./pages/authPage";
import LoginForm from "./components/login/login";
import RegisterForm from "./components/login/register";
import LogOutBtn from "./components/profilePage/logOutBtn";
import RightBar from "./components/profilePage/friendsBar";
import CreateDropModal from './components/dropButton/createDropModal';
import FriendsList from "./components/friends/friendsList";
import NewsList from "./components/trendingPanel/newsList";
import TrendingPanel from "./components/trendingPanel/trendingPanel";
import FriendsInProfile from "./components/friends/friendsInProfile";
import FriendProfile from "./components/friends/friendProfile";



customElements.define('friends-list', FriendsList);
customElements.define('news-list', NewsList);
customElements.define('trending-panel', TrendingPanel);


customElements.define("comments-component", Comments);
customElements.define("button-component", Button);
customElements.define("section-component", Section);
customElements.define('login-form', LoginForm);
customElements.define('auth-page', AuthContainer);
customElements.define('root-section', Root);
customElements.define('main-page', MainPage)
customElements.define('profile-page', ProfilePage)
customElements.define('profilecard-component', ProfileCard);
customElements.define ('register-form', RegisterForm)
customElements.define('log-out-btn', LogOutBtn);
customElements.define('right-bar', RightBar);
if (!customElements.get('create-drop-modal')) {
  customElements.define('create-drop-modal', CreateDropModal);
}
customElements.define('friends-inprofile', FriendsInProfile)
customElements.define('friend-profile', FriendProfile)

