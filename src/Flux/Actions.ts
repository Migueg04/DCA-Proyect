// src/Flux/Actions.ts

import { Friend } from '../utils/types/types';
import { AppDispatcher } from './Dispatcher';

export const NavigateActionsType = {
  NAVIGATE: 'NAVIGATE'
};

export const UserActionsType = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ADD_USER: 'ADD_USER',
  GET_USER_BY_EMAIL: 'GET_USER_BY_EMAIL',
  ADD_FRIEND_TO_PROFILE: 'ADD_FRIEND_TO_PROFILE',
  REMOVE_FRIEND_FROM_PROFILE: 'REMOVE_FRIEND_FROM_PROFILE'
};

export const CommentActionsType = {
  TOGGLE_COMMENTS: 'TOGGLE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT'
};

export const LikeActionsType = {
  TOGGLE_LIKE: 'TOGGLE_LIKE'
};

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  username: string;
  bio: string;
  age: string;
  friends: Friend[];
  profileimg: string;
  bgimg: string;
}

export interface Comment {
  postId: string;
  commentId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export const NavigateActions = {
  navigate: (path: string) => {
    // 👉 Usamos <root-section> como contenedor principal
    const rootSection = document.querySelector('root-section') as HTMLElement;
    if (!rootSection) {
      throw new Error(
        'Contenedor <root-section> no encontrado. Asegúrate de que exista en index.html'
      );
    }

    // 🚦 Inyectamos la vista correspondiente
    switch (path) {
      case '/':
        rootSection.innerHTML = `<main-page></main-page>`;
        break;

      case '/bookmarks':
      case '/saved':
        rootSection.innerHTML = `<saved-page></saved-page>`;
        break;

      case '/login':
        rootSection.innerHTML = `<login-page></login-page>`;
        break;

      case '/profile':
        rootSection.innerHTML = `<profile-page></profile-page>`;
        break;

      default:
        rootSection.innerHTML = `<not-found-page></not-found-page>`;
        break;
    }

    // 🔔 Notificamos al Dispatcher
    AppDispatcher.dispatch({
      type: NavigateActionsType.NAVIGATE,
      payload: { path }
    });
  }
};

export const UserActions = {
  setCurrentUser: (user: User) => {
    AppDispatcher.dispatch({
      type: UserActionsType.SET_CURRENT_USER,
      payload: { user }
    });
  },
  updateUserProfile: (userId: string, updates: Partial<User>) => {
    AppDispatcher.dispatch({
      type: UserActionsType.UPDATE_USER_PROFILE,
      payload: { userId, updates }
    });
  },
  loginUser: (email: string, password: string) => {
    AppDispatcher.dispatch({
      type: UserActionsType.LOGIN_USER,
      payload: { email, password }
    });
  },
  logoutUser: () => {
    AppDispatcher.dispatch({
      type: UserActionsType.LOGOUT_USER,
      payload: {}
    });
  },
  addUser: (user: User) => {
    AppDispatcher.dispatch({
      type: UserActionsType.ADD_USER,
      payload: { user }
    });
  },
  getUserByEmail: (email: string) => {
    AppDispatcher.dispatch({
      type: UserActionsType.GET_USER_BY_EMAIL,
      payload: { email }
    });
  },
  addFriendToProfile: (friend: Friend) => {
    AppDispatcher.dispatch({
      type: UserActionsType.ADD_FRIEND_TO_PROFILE,
      payload: { friend }
    });
  },
  removeFriendFromProfile: (friendUsername: string) => {
    AppDispatcher.dispatch({
      type: UserActionsType.REMOVE_FRIEND_FROM_PROFILE,
      payload: { friendUsername }
    });
  }
};

export const CommentActions = {
  toggleComments: (postId: string) => {
    AppDispatcher.dispatch({
      type: CommentActionsType.TOGGLE_COMMENTS,
      payload: { postId }
    });
  },
  addComment: (comment: Comment) => {
    AppDispatcher.dispatch({
      type: CommentActionsType.ADD_COMMENT,
      payload: { comment }
    });
  }
};

export const LikeActions = {
  toggleLike: (postId: string, userId: string) => {
    AppDispatcher.dispatch({
      type: LikeActionsType.TOGGLE_LIKE,
      payload: { postId, userId }
    });
  }
};
