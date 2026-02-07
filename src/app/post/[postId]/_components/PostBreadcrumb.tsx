import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { PATH } from '@/constants';

const PostBreadcrumb = ({ postId }: PostBreadcrumbProps) => {
  const breadcrumbs = [
    { title: 'Home', href: PATH.HOME },
    { title: 'Posts', href: PATH.POSTS },
    { title: `Post ${postId}`, href: `${PATH.POST}/${postId}` },
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.title}>
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.title}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface PostBreadcrumbProps {
  postId: string;
}

export default PostBreadcrumb;
