'use client';

import useRecentPostsQuery from '@/hooks/queries/post/use-recent-posts.query';
import { ApiResponse } from '@/types/api';
import { PostsDataResponse } from '@/types/post';

import RecentPostCard from './recent-post-card';

const RecentPostCards = ({ initialData, previewCount }: RecentPostCardsProps) => {
  const { data } = useRecentPostsQuery(1, previewCount, { initialData });

  return (
    <div className="flex flex-col gap-2">
      {data?.data?.posts.map(post => <RecentPostCard key={post.id} post={post} />)}
    </div>
  );
};

export default RecentPostCards;

interface RecentPostCardsProps {
  initialData: ApiResponse<PostsDataResponse>;
  previewCount: number;
}
