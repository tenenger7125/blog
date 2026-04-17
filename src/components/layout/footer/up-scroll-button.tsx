'use client';

import { ArrowUpIcon } from 'lucide-react';

import ActionIconButton from '@/components/shared/action-icon-button';

const UpScrollButton = () => {
  const handleUpScrollButtonClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ActionIconButton
      className="p-2 dark:bg-black dark:hover:bg-gray-800"
      label="위로"
      onClick={handleUpScrollButtonClick}>
      <ArrowUpIcon />
    </ActionIconButton>
  );
};

export default UpScrollButton;
