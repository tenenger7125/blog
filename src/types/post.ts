export interface Post {
  id: string;
  source: string;
  component: React.ReactNode;
  metaData: {
    title: string;
    description: string;
    tags: string[];
    thumbnail?: string;
  };
}
