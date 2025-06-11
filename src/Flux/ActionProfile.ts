import { AppDispatcher } from "./Dispatcher";


export const ProfileActionTypes = {
DELETE_ACCOUNT: "DELETE_ACCOUNT",
DELETE_ACCOUNT_SUCCESS: "DELETE_ACCOUNT_SUCCESS",
DELETE_ACCOUNT_ERROR: "DELETE_ACCOUNT_ERROR",
UPDATE_PROFILE: "UPDATE_PROFILE",
UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
UPDATE_PROFILE_ERROR: "UPDATE_PROFILE_ERROR",
LOGOUT: "LOGOUT",
LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
LOGOUT_ERROR: "LOGOUT_ERROR",
UPDATE_PROFILE_PHOTO: "UPDATE_PROFILE_PHOTO",
};

export const ProfileActions = {
deleteAccount: () => {
    //Llama la informacion actual del usuario
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser) {
    AppDispatcher.dispatch({
        type: ProfileActionTypes.DELETE_ACCOUNT_ERROR,
        payload: { error: "No logged in user found" },
    });
    return;
    }

    try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.filter((u: any) => u.username !== loggedInUser.username);
    localStorage.setItem("users", JSON.stringify(updatedUsers));


      // Remove logged in user
    localStorage.removeItem("loggedInUser");

      // Dispatch success action
    AppDispatcher.dispatch({
        type: ProfileActionTypes.DELETE_ACCOUNT_SUCCESS,
        payload: { username: loggedInUser.username },
    });
    } catch (error) {
      // Dispatch error action
    AppDispatcher.dispatch({
        type: ProfileActionTypes.DELETE_ACCOUNT_ERROR,
        payload: { error: "Failed to delete account" },
    });
    }
    },

updateProfile: (profileData: {
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
}) => {
    try {
      // Get current user data
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!loggedInUser) {
        AppDispatcher.dispatch({
        type: ProfileActionTypes.UPDATE_PROFILE_ERROR,
        payload: { error: "No logged in user found" },
        });
        return;
    }

    const oldUsername = loggedInUser.username;

      // Update user data
    const updatedUser = {
        ...loggedInUser,
        ...profileData,
    };

      // Update loggedInUser in localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      // Update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(
        (u: any) => u.username === oldUsername || u.email === loggedInUser.email
    );
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
    }

      // Dispatch success action
    AppDispatcher.dispatch({
        type: ProfileActionTypes.UPDATE_PROFILE_SUCCESS,
        payload: { user: updatedUser },
    });

      // Dispatch profile-updated event
    document.dispatchEvent(new CustomEvent("profile-updated"));
    } catch (error) {
    AppDispatcher.dispatch({
        type: ProfileActionTypes.UPDATE_PROFILE_ERROR,
        payload: { error: "Failed to update profile" },
    });
    }
},

logout: () => {
    try {
    localStorage.removeItem("loggedInUser");

    AppDispatcher.dispatch({
        type: ProfileActionTypes.LOGOUT_SUCCESS,
    });
    } catch (error) {
    AppDispatcher.dispatch({
        type: ProfileActionTypes.LOGOUT_ERROR,
        payload: { error: "Failed to logout" },
    });
    }
},

updateProfilePhoto(photoBase64: string) {
    AppDispatcher.dispatch({
    type: ProfileActionTypes.UPDATE_PROFILE_PHOTO,
    payload: { photo: photoBase64 },
    });
},
};