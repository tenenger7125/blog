import { Calendar, Lock, Unlock } from 'lucide-react';
import Link from 'next/link';

import ActionIconButton from '@/components/shared/action-icon-button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PATH } from '@/constants';
import { PostDataResponse } from '@/types/post';
import { formatRelativeDate } from '@/utils/date';
import { excludeImageTag } from '@/utils/sanitize';

const Post = ({ post }: PostProps) => (
  <Link className="w-full" href={`${PATH.POST}/${post.id}`}>
    <Card className="relative h-full bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-black">
      <div className="absolute right-0 top-0 p-3">
        <ActionIconButton className="px-4 py-2" label={post.published ? '공개' : '비공개'}>
          {post.published ? <Unlock className="size-5" /> : <Lock className="size-5" />}
        </ActionIconButton>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-2 h-12" dangerouslySetInnerHTML={{ __html: excludeImageTag(post.content) }} />
      </CardContent>
      <CardFooter>
        <span className="flex items-center gap-1">
          <Calendar className="size-5" />
          <span>{formatRelativeDate(post.createdAt)}</span>
        </span>
      </CardFooter>
    </Card>
  </Link>
);

interface PostProps {
  post: PostDataResponse;
}

export default Post;
