import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserActions } from "../Flux/Actions";

export async function registerUser(
  email: string,
  password: string,
  profile: {
    name: string;
    username: string;
    bio: string;
    age: string;
  }
): Promise<UserCredential> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  
  await setDoc(doc(db, "users", cred.user.uid), {
    id: cred.user.uid,
    email,
    ...profile,
    profileimg: "https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg",
    bgimg: "",
    friends: "",
  });
  
  UserActions.setCurrentUser({
    id: cred.user.uid,
    email,
    password,
    ...profile,
    profileimg: "https://i.pinimg.com/736x/e0/5a/19/e05a1996300035d853b03f8af6ce0c4a.jpg",
    bgimg: "",
    friends: [],
    username: profile.username,
    bio: profile.bio,
    age: profile.age,
  });
  return cred;
}

export async function loginUser(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
 
  const snap = await getDoc(doc(db, "users", cred.user.uid));
  if (snap.exists()) {
    const data = snap.data();
    UserActions.setCurrentUser(data as any);
  }
  return cred;
}
