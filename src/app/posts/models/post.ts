export interface Post {
  id?: string;
  date: Date;
  title: string;
  author: string;
  content: string;
  likes: string[];
  imagePath: string;
}
