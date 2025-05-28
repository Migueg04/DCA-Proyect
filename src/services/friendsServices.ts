import { Friend } from '../utils/types/types';

export async function fetchFriends(): Promise<Friend[]> {
  const response = await fetch('/data/friends.json');
  if (!response.ok) throw new Error('Error fetching friends');
  return await response.json();
}
