import Link from 'next/link';

import { PATH } from '@/constants';

const RecentPostsHeader = () => (
  <div className="mb-4 flex items-center justify-between">
    <h3 className="text-lg font-bold dark:text-gray-0">최근 게시글</h3>
    <Link
      className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
      href={PATH.POSTS}>
      더보기 →
    </Link>
  </div>
);

export default RecentPostsHeader;
