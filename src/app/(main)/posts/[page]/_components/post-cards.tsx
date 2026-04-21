'use client';

import usePostsQuery from '@/hooks/queries/post/use-posts.query';
import { ApiResponse } from '@/types/api';
import { PostsDataResponse } from '@/types/post';

import Post from './post';

const PostCards = ({ page, pageSize, initialData }: PostListProps) => {
  const { data } = usePostsQuery(page, pageSize, { initialData });

  return (
    <div className="flex flex-wrap gap-2 leading-loose">
      {data?.data?.posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

interface PostListProps {
  page: number;
  pageSize: number;
  initialData: ApiResponse<PostsDataResponse>;
}

export default PostCards;
