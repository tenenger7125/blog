import { Separator } from '@/components/ui/separator';
import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { getHighlightedHtml } from '@/lib/parse-html';
import { PostDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import Comment from './_components/comment';
import EditPostButton from './_components/edit-post-button';
import PostBreadcrumb from './_components/post-breadcrumb';
import ScrollRestoration from './_components/scroll-restoration';

import 'highlight.js/styles/github-dark.css'; // 에디터와 동일한 CSS 로드

const Post = async ({ params: { postId } }: { params: { postId: string } }) => {
  const res = await requestHttp.get<PostDataResponse>(`${INTERNAL_URL_IN_NODE.POSTS}/${postId}`);

  const post = res.data;

  if (!post) {
    return null;
  }

  const highlightedContent = await getHighlightedHtml(post.content);

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-center gap-5">
      <div className="post prism prose min-h-screen w-full max-w-full dark:text-gray-300">
        <div className="flex justify-end">
          <EditPostButton postId={postId} />
        </div>
        <PostBreadcrumb postId={post.id.toString()} />
        <div
          className="tiptap-content simple-editor-content"
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        />
      </div>
      <Separator />
      <Comment />

      {/* <TableOfContent headings={headings} /> */}
      <ScrollRestoration />
    </div>
  );
};

export default Post;
