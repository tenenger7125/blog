import { Calendar } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PATH } from '@/constants';
import { PostData } from '@/types/post';

const Post = ({ post }: PostProps) => (
  <Link className="w-full" href={`${PATH.POST}/${post.id}`}>
    <Card className="h-full bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-black">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 h-12">{post.content}</p>
      </CardContent>
      <CardFooter>
        <span className="flex items-center gap-1">
          <Calendar className="size-5" />
          <span>{new Date(post.createdAt).toLocaleString('ko-KR', { timeZone: 'UTC' })}</span>
        </span>
      </CardFooter>
    </Card>
  </Link>
);

interface PostProps {
  post: PostData;
}

export default Post;
