import { markdown } from '@/utils/node/files';

import Post from './Post';

const PostList = async () => {
  const files = await markdown.readFiles();

  return (
    <div className="flex flex-wrap gap-2 leading-loose">
      {files
        .toSorted((a, b) => +b.id - +a.id)
        .map(({ id, metaData }) => (
          <Post key={id} metaData={metaData} postId={id} />
        ))}
    </div>
  );
};

export default PostList;
