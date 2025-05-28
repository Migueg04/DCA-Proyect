import { AppDispatcher } from './Dispatcher';


export const NavigateActionsType = {
  NAVIGATE: 'NAVIGATE'
};

export const NavigateActions = {
  navigate: (path: string) => {
    AppDispatcher.dispatch({
      type: NavigateActionsType.NAVIGATE,
      payload: { path }
    });
  }
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
//Comentarios y Dropssss 
export const CommentsActionsType = {
  LOAD_COMMENTS: 'LOAD_COMMENTS',
  SET_COMMENTS: 'SET_COMMENTS'
};

export const CommentsActions = {
  loadComments: (): void => {
   
    AppDispatcher.dispatch({ type: CommentsActionsType.LOAD_COMMENTS });
    fetch('/data/comments.json')
      .then(res => res.json())
      .then((comments) => {
        AppDispatcher.dispatch({
          type: CommentsActionsType.SET_COMMENTS,
          payload: { comments }
        });
      })
      .catch(err => console.error('Error loading comments:', err));
  }
};


export const DropsActionsType = {
  LOAD_DROPS: 'LOAD_DROPS',
  SET_DROPS: 'SET_DROPS'
};

export const DropsActions = {
  loadDrops: (): void => {
    AppDispatcher.dispatch({ type: DropsActionsType.LOAD_DROPS });
    fetch('/data/drops.json')
      .then(res => res.json())
      .then((drops) => {
        AppDispatcher.dispatch({
          type: DropsActionsType.SET_DROPS,
          payload: { drops }
        });
      })
      .catch(err => console.error('Error loading drops:', err));
  }
};
