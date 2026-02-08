'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { PATH } from '@/constants';

const PostPagination = ({ page: defaultPage, totalPage }: PostPaginationProps) => {
  const router = useRouter();
  const [page, setPage] = useState(defaultPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`${PATH.POSTS}/${newPage}`);
  };

  return (
    <div className="py-7">
      <Pagination>
        <PaginationContent>
          {Array.from({ length: totalPage }, (_, i) => i + 1).map(pageNumber => (
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
  totalPage: number;
}
