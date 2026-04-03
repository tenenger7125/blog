import { PostData } from '@/types/post';

import Post from './post';

const PostList = ({ posts }: PostListProps) => (
  <div className="flex flex-wrap gap-2 leading-loose">
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

interface PostListProps {
  posts: PostData[];
}

export default PostList;
