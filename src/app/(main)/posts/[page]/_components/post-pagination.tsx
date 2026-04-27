'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { PATH } from '@/constants';
import usePostsQuery from '@/hooks/queries/post/use-posts.query';

const PostPagination = ({ page: defaultPage, pageSize }: PostPaginationProps) => {
  const [page, setPage] = useState(defaultPage);
  const { data } = usePostsQuery(page, pageSize);
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`${PATH.POSTS}/${newPage}`);
  };

  return (
    <div className="py-7">
      <Pagination>
        <PaginationContent>
          {Array.from({ length: data?.data?.totalPage || 0 }, (_, i) => i + 1).map(pageNumber => (
            <PaginationItem key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
              <PaginationLink isActive={pageNumber === page}>{pageNumber}</PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PostPagination;

interface PostPaginationProps {
  page: number;
  pageSize: number;
}
