import { Calendar } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PATH } from '@/constants';
import { PostDataResponse } from '@/types/post';
import { formatRelativeDate } from '@/utils/date';
import { excludeImageTag } from '@/utils/sanitize';

const RecentPostCard = ({ post }: { post: PostDataResponse }) => (
  <Link key={post.id} className="w-full" href={`${PATH.POST}/${post.id}`}>
    <Card className="bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-black">
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-base">
          {post.category?.name && `[${post.category.name}] `}
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div
          className="line-clamp-2 h-10 text-sm"
          dangerouslySetInnerHTML={{ __html: excludeImageTag(post.content) }}
        />
      </CardContent>
      <CardFooter>
        <span className="flex items-center gap-1 text-xs">
          <Calendar className="size-4" />
          <span>{formatRelativeDate(post.createdAt)}</span>
        </span>
      </CardFooter>
    </Card>
  </Link>
);

export default RecentPostCard;
