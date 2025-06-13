import { doc, updateDoc, getDoc} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../Flux/Actions";

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
