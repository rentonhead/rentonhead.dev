export interface Post {
  title: string;
  overview: string;
  content: any;
  _id: string;
  imageUrl: string;
  slug: {
    current: string;
  };
  _createdAt: string;
}
