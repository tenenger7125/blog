import { PostCategoryResponse } from './post-category';

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

export type PostsDataResponse = {
  page: number;
  pageSize: number;
  totalPage: number;
  offset: number;
  total: number;
  posts: PostDataResponse[];
};

export type PostDataResponse = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  categoryId: number;
  category: PostCategoryResponse | null;
};
