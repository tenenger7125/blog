'use client';

import { useEffect, useState } from 'react';

import { SimpleEditor } from '@/components/shared/tiptap/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/ui/input';
import usePostQuery from '@/hooks/queries/post/use-post.query';
import { ApiResponse } from '@/types/api';
import { PostDataResponse } from '@/types/post';

const PostEditor = ({ postId, initialData }: PostEditorProps) => {
  const { data } = usePostQuery(postId, { initialData });
  const post = data?.data;

  const [input, setInput] = useState(post?.title || '');

  useEffect(() => {
    setInput(post?.title || '');
  }, [post?.title]);

  return (
    post && (
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
          category={post?.category?.name}
          content={post?.content}
          postId={+postId}
          published={post?.published}
          title={input}
          isEdit
        />
      </div>
    )
  );
};

export default PostEditor;

interface PostEditorProps {
  postId: string;
  initialData: ApiResponse<PostDataResponse> | undefined;
}
