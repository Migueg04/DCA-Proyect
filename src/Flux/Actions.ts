
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
  GET_USER_BY_EMAIL: 'GET_USER_BY_EMAIL'
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
  friends: string;
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