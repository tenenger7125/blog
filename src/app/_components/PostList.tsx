import { cn } from 'dotori-utils';
import Link from 'next/link';

import { PATH } from '@/constants';
import { markdown } from '@/utils/node/files';

const PostList = async () => {
  const files = await markdown.readFiles();

  return (
    <>
      {files.map(({ id, metaData }) => (
        <Link key={id} className={PostListStyle()} href={`${PATH.POSTS}/${id}`}>
          {JSON.stringify(metaData.title)}\{id}
        </Link>
      ))}
    </>
  );
};

const PostListStyle = cn(
  'flex items-center box-border justify-center max-md:w-full md:max-w-[calc(50%-4px)] lg:w-80 h-80 font-bold border border-gray-100 rounded-lg hover:bg-gray-200',
);

export default PostList;
