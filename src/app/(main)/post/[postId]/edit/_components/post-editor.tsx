'use client';

import { useState } from 'react';

import { SimpleEditor } from '@/components/shared/tiptap/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/ui/input';
import { PostData } from '@/types/post';

const PostEditor = ({ post }: PostEditorProps) => {
  const [input, setInput] = useState(post.title);

  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <Input
          className="mb-4 text-2xl font-bold"
          placeholder="제목을 입력하세요"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <SimpleEditor content={post.content} postId={post.id} title={input} isEdit />
    </div>
  );
};

export default PostEditor;

interface PostEditorProps {
  post: PostData;
}
