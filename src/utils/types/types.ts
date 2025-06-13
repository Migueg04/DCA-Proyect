export interface News {
	title: string;
	subtitle: string;
	image: string;
}
export interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  email?: string;
  level?: number;
  points?: number;
  
}


export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  password?: string; 
  friends?: Friend[];
  level?: number;
  points?: number;
}