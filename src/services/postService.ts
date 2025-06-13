import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

export interface Post {
  id: string;
  userId: string;
  username: string;
  content: string;
  image: string;
  createdAt: Date;
}


export async function createPost(
  userId: string,
  username: string,
  content: string,
  image: string
): Promise<void> {
  await addDoc(collection(db, "posts"), {
    userId,
    username,
    content,
    image,
    createdAt: Timestamp.now()
  });
}


export function subscribePosts(
  callback: (posts: Post[]) => void
): () => void {
  const q = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const posts: Post[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        userId: data.userId as string,
        username: data.username as string,
        content: data.content as string,
        image: data.image as string,
        createdAt: (data.createdAt as Timestamp).toDate()
      };
    });
    callback(posts);
  });
  return unsubscribe;
}


export async function deletePost(postId: string): Promise<void> {
  await deleteDoc(doc(db, "posts", postId));
}

export async function editPost(
  postId: string,
  updates: Partial<Omit<Post, "id" | "createdAt" | "userId" | "username">>
): Promise<void> {
  await updateDoc(doc(db, "posts", postId), updates as any);
}

export async function guardarPost(post: any): Promise<void> {
  try {
    await addDoc(collection(db, "posts_guardados"), post);
    console.log("Post guardado exitosamente.");
  } catch (error) {
    console.error("Error al guardar el post:", error);
  }
};
export default guardarPost;