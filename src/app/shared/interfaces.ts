export interface User {
  email: string;
  password: string;
}

export interface Post {
  id?: string;
  date: Date;
  title: string;
  author: string;
  content: string;
}
