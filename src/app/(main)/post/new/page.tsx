'use client';

import { useState } from 'react';

import { SimpleEditor } from '@/components/shared/tiptap/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/ui/input';

const Page = () => {
  const [title, setTitle] = useState('');

  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <Input
          className="mx-auto mb-4 max-w-[80%]"
          placeholder="제목을 입력하세요"
          sizing="lg"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <SimpleEditor postId={0} title={title} />
    </div>
  );
};

export default Page;
