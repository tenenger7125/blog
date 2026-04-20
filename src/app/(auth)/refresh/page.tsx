'use client';

import { Suspense } from 'react';

import ReissueToken from './re-issue-token';

export default function RefreshPage() {
  return (
    <Suspense fallback={null}>
      <ReissueToken />
    </Suspense>
  );
}
