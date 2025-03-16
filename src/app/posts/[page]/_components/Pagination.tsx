'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { PATH } from '@/constants';

const DotoriPagination = dynamic(() => import('dotori-components').then(mod => mod.Pagination), { ssr: false });

const Pagination = ({ page: defaultPage, totalPage }: PaginationProps) => {
  const router = useRouter();
  const [page, setPage] = useState(defaultPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`${PATH.POSTS}/${newPage}`);
  };

  return (
    <div className="py-7">
      <DotoriPagination page={page} pageTotal={totalPage} siblingCount={2} onChange={handlePageChange} />
    </div>
  );
};

interface PaginationProps {
  page: number;
  totalPage: number;
}

export default Pagination;
