'use client';

import { useState } from 'react';

import { cn } from 'dotori-utils';
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
            <PaginationItem key={pageNumber} className={pageItemStyle()} onClick={() => handlePageChange(pageNumber)}>
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

const pageItemStyle = cn('dark:bg-gray-800 dark:text-gray-0', {
  variants: {
    isActive: {
      true: 'dark:bg-gray-800 hover:',
      false: 'text-gray-0 dark',
    },
  },
});
