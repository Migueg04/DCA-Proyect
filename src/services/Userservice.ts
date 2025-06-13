import { doc, updateDoc, getDoc, collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../Flux/Actions";
import { Friend } from "../utils/types/types";

export async function updateUserProfile(userId: string, updates: Partial<any>) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, updates);

}

export async function getUserById(userId:string): Promise<User | null> {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() } as User;
    } else {
      console.log("No se encontró el usuario con ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
}


export async function getAllUsers(): Promise<Friend[]> {
  try {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(usersCol);

    const users: Friend[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        username: data.username,
        avatar: data.avatar || '/default-avatar.png',
      };
    });

    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
}