import { cn } from 'dotori-utils';
import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/constants';

import type { Post as PostType } from '@/types/post';

const Post = ({ postId, metaData: { title, description, tags, thumbnail } }: PostProps) => {
  const isExistTag = tags.length > 0;
  const mainTag = tags[0];

  const tagClassName = tagMapStyle[mainTag as keyof typeof tagMapStyle];

  return (
    <Link className={PostStyle()} href={`${PATH.POSTS}/${postId}`}>
      <div className="relative h-40 w-full overflow-hidden bg-red-100">
        <Image
          alt="thumbnail"
          className="object-cover transition-all group-hover:scale-125"
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}${thumbnail}` || 'https://placehold.co/600x400'}
          fill
        />
        {isExistTag && <span className={tagStyle({ className: tagClassName })}>{mainTag}</span>}
      </div>
      <h3 className="my-3 line-clamp-1 font-semibold leading-normal">{title}</h3>
      <p className="line-clamp-3 text-xs font-normal leading-normal">{description}</p>
    </Link>
  );
};

interface PostProps {
  postId: PostType['id'];
  metaData: PostType['metaData'];
}

const tagMapStyle = {
  react: 'bg-blue-500 text-white',
  js: 'bg-yellow-400 text-black',
  cs: 'bg-cyan-400 text-white',
  algorithm: 'bg-red-400 text-white',
  'react-query': 'bg-red-600 text-white',
  hackerton: 'bg-teal-600 text-white',
  prismjs: 'text-white bg-gray-900',
};

const PostStyle = cn([
  'group box-border w-full h-80 font-bold border border-gray-100 rounded-lg hover:bg-gray-100 p-2',
  'max-md:w-full', // md 이하: full width
  'md:max-w-[calc(50%-5px)]', // md 이상: 50% - 5px
  'lg:max-w-[calc(33%-3px)]', // lg 이상: 33% - 3px
  '2lg:w-80', // 2lg 이상: 80rem
]);

const tagStyle = cn('absolute right-2 top-2 text-xs font-normal uppercase py-1 px-2 rounded-lg bg-gray-400 text-black');

export default Post;
