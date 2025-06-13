import { EventEmitter } from "events";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

class Profilestore extends EventEmitter {
  private currentUser: any = null;
  private unsubscribeSnapshot: (() => void) | null = null;

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
    this.emit("change");

    // Escucha en tiempo real desde Firestore
    if (user?.id) {
      if (this.unsubscribeSnapshot) this.unsubscribeSnapshot();
      this.unsubscribeSnapshot = onSnapshot(doc(db, "users", user.id), (docSnap) => {
        if (docSnap.exists()) {
          this.currentUser = docSnap.data();
          this.emit("change");
        }
      });
    }
  }

  clearCurrentUser() {
    this.currentUser = null;
    this.emit("change");
    if (this.unsubscribeSnapshot) this.unsubscribeSnapshot();
  }

  subscribe(callback: () => void) {
    this.on("change", callback);
  }

  unsubscribe(callback: () => void) {
    this.off("change", callback);
  }
}

export const profilestore = new Profilestore();
