export interface MetaData {
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  date: string;
}

export type UploadPostRequest = {
  title: string;
  content: string;
  published: boolean;
};

export type PostDataResponse = {
  page: number;
  pageSize: number;
  totalPage: number;
  offset: number;
  total: number;
  posts: PostData[];
};

export type PostData = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: number;
};
