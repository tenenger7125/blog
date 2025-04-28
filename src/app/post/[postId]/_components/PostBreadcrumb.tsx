import { cn } from 'dotori-utils';
import Link from 'next/link';

import { Breadcrumb } from '@/components';
import { PATH } from '@/constants';

const PostBreadcrumb = ({ postId }: PostBreadcrumbProps) => {
  const breadcrumbs = [
    { title: 'Home', href: PATH.HOME },
    { title: 'Posts', href: PATH.POSTS },
    { title: `Post ${postId}`, href: `${PATH.POST}/${postId}` },
  ];

  return (
    <Breadcrumb>
      {breadcrumbs.map((breadcrumb, index) => (
        <Link
          key={index}
          className={breadcrumbStyle({ disabled: index === breadcrumbs.length - 1 })}
          href={breadcrumb.href}>
          {breadcrumb.title}
        </Link>
      ))}
    </Breadcrumb>
  );
};

interface PostBreadcrumbProps {
  postId: string;
}

const breadcrumbStyle = cn('', {
  variants: {
    disabled: {
      true: 'pointer-events-none !text-gray-900 decoration-transparent dark:!text-gray-600',
      false: '',
    },
  },
});

export default PostBreadcrumb;
