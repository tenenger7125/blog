'use client';

import { useState } from 'react';

import dynamic from 'next/dynamic';

const DotoriPagination = dynamic(() => import('dotori-components').then(mod => mod.Pagination), { ssr: false });

const Pagination = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="py-7">
      <DotoriPagination page={page} pageTotal={5} siblingCount={2} onChange={handlePageChange} />
    </div>
  );
};

export default Pagination;
