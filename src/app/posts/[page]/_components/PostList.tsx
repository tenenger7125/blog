import { MarkdownFile } from '@/utils/node/files';

import Post from './Post';

const PostList = ({ posts }: PostListProps) => (
  <div className="flex flex-wrap gap-2 leading-loose">
    {posts.map(({ id, metaData }) => (
      <Post key={id} metaData={metaData} postId={id} />
    ))}
  </div>
);

interface PostListProps {
  posts: MarkdownFile[];
}

export default PostList;
