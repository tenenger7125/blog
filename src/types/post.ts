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
