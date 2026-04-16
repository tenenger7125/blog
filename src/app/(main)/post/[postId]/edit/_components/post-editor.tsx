'use client';

import { useState } from 'react';

import { SimpleEditor } from '@/components/shared/tiptap/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/ui/input';
import { PostDataResponse } from '@/types/post';

const PostEditor = ({ post }: PostEditorProps) => {
  const [input, setInput] = useState(post.title);

  return (
    <div className="flex w-full flex-col">
      <div className="w-full">
        <Input
          className="mx-auto mb-4 max-w-[80%]"
          placeholder="제목을 입력하세요"
          sizing="lg"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <SimpleEditor
        category={post.category?.name}
        content={post.content}
        postId={post.id}
        published={post.published}
        title={input}
        isEdit
      />
    </div>
  );
};

export default PostEditor;

interface PostEditorProps {
  post: PostDataResponse;
}
