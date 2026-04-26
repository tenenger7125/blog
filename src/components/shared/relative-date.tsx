'use client';

import { useMemo } from 'react';

export const formatRelativeDate = (utcDate: string): string => {
  const date = new Date(utcDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  const isSameDate = date.toLocaleDateString() === now.toLocaleDateString();

  if (isSameDate && diffSec < 60) return `${diffSec}초 전`;
  if (isSameDate && diffMin < 60) return `${diffMin}분 전`;
  if (isSameDate && diffHour < 24) return `${diffHour}시간 전`;

  // 하루 지나면 로컬 시간대 기준 날짜 표시
  return date.toLocaleDateString('ko-KR');
};

const RelativeDate = ({ date }: { date: string }) => {
  const label = useMemo(() => formatRelativeDate(date), [date]);

  return label;
};

export default RelativeDate;
