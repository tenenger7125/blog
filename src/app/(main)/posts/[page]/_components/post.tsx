import { Calendar } from 'lucide-react';
import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PATH } from '@/constants';
import { PostDataResponse } from '@/types/post';
import { formatRelativeDate } from '@/utils/date';

const Post = ({ post }: PostProps) => {
  const clean = sanitizeHtml(post.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter(tag => tag !== 'img'),
  });

  return (
    <Link className="w-full" href={`${PATH.POST}/${post.id}`}>
      <Card className="h-full bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-black">
        <CardHeader>
          <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="line-clamp-2 h-12" dangerouslySetInnerHTML={{ __html: clean }} />
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
};

interface PostProps {
  post: PostDataResponse;
}

export default Post;
