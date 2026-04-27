'use client';

import usePostsQuery from '@/hooks/queries/post/use-posts.query';

import Post from './post';

const PostCards = ({ page, pageSize }: PostListProps) => {
  const { data } = usePostsQuery(page, pageSize);

  return (
    <div className="flex flex-wrap gap-2 leading-loose">
      {data?.data?.posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
};

interface PostListProps {
  page: number;
  pageSize: number;
}

export default PostCards;
