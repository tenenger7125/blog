'use client';

import usePostsQuery from '@/hooks/queries/post/use-posts.query';

import Post from '../../../posts/[page]/_components/post';

const RecentPostCards = ({ page, pageSize }: RecentPostCardsProps) => {
  const { data } = usePostsQuery(page, pageSize);

  return <div className="flex flex-col gap-2">{data?.data?.posts.map(post => <Post key={post.id} post={post} />)}</div>;
};

export default RecentPostCards;

interface RecentPostCardsProps {
  page: number;
  pageSize: number;
}
