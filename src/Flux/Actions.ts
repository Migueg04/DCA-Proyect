// src/Flux/Actions.ts
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

// ------------------------------
// Flux para Drops (Posts)
// ------------------------------
export const DropActionsType = {
  GET_DROPS: 'GET_DROPS',
  SET_DROPS: 'SET_DROPS',
  ADD_DROP: 'ADD_DROP',
  UPDATE_DROP: 'UPDATE_DROP',
  REMOVE_DROP: 'REMOVE_DROP'
};

export interface Drop {
  id: string;
  authorId: string;
  content: string;
  timestamp: string;
}

export const DropActions = {
  getDrops: () => {
    AppDispatcher.dispatch({
      type: DropActionsType.GET_DROPS,
      payload: {}
    });
  },

  setDrops: (drops: Drop[]) => {
    AppDispatcher.dispatch({
      type: DropActionsType.SET_DROPS,
      payload: { drops }
    });
  },

  addDrop: (drop: Drop) => {
    AppDispatcher.dispatch({
      type: DropActionsType.ADD_DROP,
      payload: { drop }
    });
  },

  updateDrop: (dropId: string, updates: Partial<Drop>) => {
    AppDispatcher.dispatch({
      type: DropActionsType.UPDATE_DROP,
      payload: { dropId, updates }
    });
  },

  removeDrop: (dropId: string) => {
    AppDispatcher.dispatch({
      type: DropActionsType.REMOVE_DROP,
      payload: { dropId }
    });
  }
};

// ------------------------------
// Flux para Comentarios
// ------------------------------
export const CommentActionsType = {
  GET_COMMENTS: 'GET_COMMENTS',
  SET_COMMENTS: 'SET_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  UPDATE_COMMENT: 'UPDATE_COMMENT',
  REMOVE_COMMENT: 'REMOVE_COMMENT'
};

export interface Comment {
  id: string;
  dropId: string;
  authorId: string;
  text: string;
  timestamp: string;
}

export const CommentActions = {
  getComments: (dropId: string) => {
    AppDispatcher.dispatch({
      type: CommentActionsType.GET_COMMENTS,
      payload: { dropId }
    });
  },

  setComments: (comments: Comment[]) => {
    AppDispatcher.dispatch({
      type: CommentActionsType.SET_COMMENTS,
      payload: { comments }
    });
  },

  addComment: (comment: Comment) => {
    AppDispatcher.dispatch({
      type: CommentActionsType.ADD_COMMENT,
      payload: { comment }
    });
  },

  updateComment: (commentId: string, updates: Partial<Comment>) => {
    AppDispatcher.dispatch({
      type: CommentActionsType.UPDATE_COMMENT,
      payload: { commentId, updates }
    });
  },

  removeComment: (commentId: string) => {
    AppDispatcher.dispatch({
      type: CommentActionsType.REMOVE_COMMENT,
      payload: { commentId }
    });
  }
};
