import { Icon } from 'dotori-icons';
import { cn } from 'dotori-utils';
import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/constants';
import { MarkdownFile } from '@/utils/node/files';

const Post = ({ postId, metaData: { title, description, tags, thumbnail, date } }: PostProps) => (
  <Link className={PostStyle()} href={`${PATH.POST}/${postId}`}>
    <div className="relative min-h-40 w-full overflow-hidden bg-inherit">
      <Image
        alt="thumbnail"
        className="object-cover transition-all group-hover:scale-125"
        src={`${process.env.NEXT_PUBLIC_BASE_PATH}${thumbnail}` || 'https://placehold.co/600x400'}
        fill
        priority
      />
    </div>
    <div className="flex-1">
      <div className="line-clamp-1 flex flex-nowrap items-start gap-1">
        {tags.map(tag => (
          <span key={tag} className={tagStyle()}>
            {tag}
          </span>
        ))}
      </div>
      <h3 className="my-3 line-clamp-1 font-semibold leading-normal">{title}</h3>
      <p className="line-clamp-2 text-xs font-normal leading-normal">{description}</p>
    </div>
    <div className="text-xs font-normal">
      <span className="flex items-center gap-1">
        <Icon className="fill-gray-700" icon="calendar" size="sm" />
        <span>{date}</span>
      </span>
    </div>
  </Link>
);

interface PostProps {
  postId: MarkdownFile['id'];
  metaData: MarkdownFile['metaData'];
}

const PostStyle = cn([
  'group box-border w-full h-80 font-bold border border-gray-100 rounded-lg hover:bg-gray-100 p-2 flex flex-col gap-2',
  'w-full', // md 이하: full width
  'md:max-w-[calc(50%-5px)]', // md 이상: 50% - 5px
  'lg:max-w-[calc(33%-3px)]', // lg 이상: 33% - 3px
  '2lg:max-w-[calc(25%-7px)]', // 2lg 이상: 80rem
]);

const tagStyle = cn('font-semibold text-xs uppercase px-1 py-1 bg-white rounded-lg text-pink-700 text-nowrap');

export default Post;
