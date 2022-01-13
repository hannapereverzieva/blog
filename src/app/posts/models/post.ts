export interface Post {
  id?: string;
  date: Date;
  title: string;
  author: string;
  creator?: string | null;
  content: string;
  likes: string[];
  imagePath: string;
}
