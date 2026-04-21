'use client';

import { useMemo } from 'react';

import { notFound } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import usePostQuery from '@/hooks/queries/post/use-post.query';
import { extractHeadings, injectHeadingIds } from '@/lib/node/heading';
import { getHighlightedHtml } from '@/lib/parse-html';
import { ApiResponse } from '@/types/api';
import { PostDataResponse } from '@/types/post';

import Comment from './comment';
import EditPostButton from './edit-post-button';
import PostBreadcrumb from './post-breadcrumb';
import PostContentViewer from './post-content-viewer';
import ScrollRestoration from './scroll-restoration';
import TableOfContentMobile from './table-of-content-mobile';

import 'highlight.js/styles/github-dark.css'; // 에디터와 동일한 CSS 로드

const PostViewer = ({ initialData, postId }: PostViewerProps) => {
  const { data, isFetched } = usePostQuery(postId, { initialData });
  const post = data?.data;

  if (isFetched && !post) {
    notFound();
  }

  // ✅ content가 바뀔 때만 재계산
  const { headings, contentWithIds } = useMemo(() => {
    const highlightedContent = getHighlightedHtml(post?.content || '');
    return {
      headings: extractHeadings(highlightedContent),
      contentWithIds: injectHeadingIds(highlightedContent),
    };
  }, [post?.content]);

  return (
    <div className="w-full min-w-0">
      <TableOfContentMobile headings={headings} />

      <div className="post prose min-h-screen w-full max-w-full dark:text-gray-300">
        <div className="flex items-center justify-between">
          <PostBreadcrumb postId={postId} />
          <EditPostButton postId={postId} />
        </div>
        <h2 className="text-center">
          {post?.category?.name && `[${post?.category.name}] `}
          {post?.title}
        </h2>
        <article className="tiptap">
          <div className="tiptap-content simple-editor-content">{<PostContentViewer html={contentWithIds} />}</div>
        </article>
      </div>
      <Separator />
      <Comment />
      <ScrollRestoration />
    </div>
  );
};

export default PostViewer;

interface PostViewerProps {
  initialData: ApiResponse<PostDataResponse> | undefined;
  postId: string;
}
