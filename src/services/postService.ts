// src/services/postService.ts
import { db } from '../firebase';
import {
	collection,
	addDoc,
	onSnapshot,
	query,
	orderBy,
	Timestamp,
	doc,
	deleteDoc,
	updateDoc,
	getDocs,
	where,
} from 'firebase/firestore';

export interface Post {
	id: string;
	userId: string;
	username: string;
	content: string;
	image: string;
	createdAt: Date;
}

// Para los guardados:
export interface SavedPost {
	id: string;
	userId: string;
	username: string;
	content: string;
	image: string;
	savedBy: string;
	savedAt: Date;
}

// --- POSTS NORMALES ---

export async function createPost(userId: string, username: string, content: string, image: string): Promise<void> {
	await addDoc(collection(db, 'posts'), {
		userId,
		username,
		content,
		image,
		createdAt: Timestamp.now(),
	});
}

export function subscribePosts(callback: (posts: Post[]) => void): () => void {
	const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
	const unsub = onSnapshot(q, (snap) => {
		const arr: Post[] = snap.docs.map((docSnap) => {
			const d = docSnap.data();
			return {
				id: docSnap.id,
				userId: d.userId as string,
				username: d.username as string,
				content: d.content as string,
				image: d.image as string,
				createdAt: (d.createdAt as Timestamp).toDate(),
			};
		});
		callback(arr);
	});
	return unsub;
}

export async function deletePost(postId: string): Promise<void> {
	await deleteDoc(doc(db, 'posts', postId));
}

export async function editPost(
	postId: string,
	updates: Partial<Omit<Post, 'id' | 'createdAt' | 'userId' | 'username'>>
): Promise<void> {
	await updateDoc(doc(db, 'posts', postId), updates as any);
}

// --- POSTS GUARDADOS ---

/**
 * Guarda un post en posts_guardados
 */
export async function guardarPost(post: any, userId: string): Promise<void> {
	await addDoc(collection(db, 'posts_guardados'), {
		...post,
		savedBy: userId,
		savedAt: Timestamp.now(),
	});
}

/**
 * Obtiene lista de guardados de un usuario
 */
export async function fetchSavedPosts(userId: string): Promise<Post[]> {
	const q = query(collection(db, 'posts_guardados'), where('savedBy', '==', userId), orderBy('savedAt', 'desc'));
	const snap = await getDocs(q);
	return snap.docs.map((docSnap) => {
		const data = docSnap.data();
		return {
			// si en tu guardado guardas `id` explícito, úsalo, si no fallback a docSnap.id
			id: (data.id as string) || docSnap.id,
			userId: data.userId as string,
			username: data.username as string,
			content: data.content as string,
			image: data.image as string,
			createdAt: (data.savedAt as Timestamp).toDate(),
		};
	});
}

export default guardarPost;
