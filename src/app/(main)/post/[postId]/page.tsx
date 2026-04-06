import { Separator } from '@/components/ui/separator';
import { INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { getHighlightedHtml } from '@/lib/parse-html';
import { PostDataResponse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import Comment from './_components/comment';
import EditPostButton from './_components/edit-post-button';
import PostBreadcrumb from './_components/post-breadcrumb';
import PostContentViewer from './_components/post-content-viewer';
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
      <div className="post prose min-h-screen w-full max-w-full dark:text-gray-300">
        <div className="flex items-center justify-between">
          <PostBreadcrumb postId={post.id.toString()} />
          <EditPostButton postId={postId} />
        </div>
        <h2 className="text-center">{post.title}</h2>
        <article className="tiptap">
          <div className="tiptap-content simple-editor-content">{<PostContentViewer html={highlightedContent} />}</div>
        </article>
      </div>
      <Separator />
      <Comment />

      {/* <TableOfContent headings={headings} /> */}
      <ScrollRestoration />
    </div>
  );
};

export default Post;

export async function generateMetadata({ params }: { params: { postId: string } }) {
  const res = await requestHttp.get<PostDataResponse>(`${INTERNAL_URL_IN_NODE.POSTS}/${params.postId}`);
  const post = res.data;

  if (!post) {
    return { title: '포스트를 찾을 수 없습니다.' };
  }

  const plainText = post.content.replace(/<[^>]+>/g, '').trim();
  const description = plainText.slice(0, 150) + (plainText.length > 150 ? '...' : '');

  const postUrl = `https://blog-nu-dun-70.vercel.app/post/${params.postId}`;

  return {
    title: post.title,
    description,
    openGraph: {
      type: 'article', // website → article
      url: postUrl,
      title: post.title,
      description,
      images: [
        {
          url: '/logo.png',
          alt: '동그라미 블로그 로고',
          width: 734,
          height: 714,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description,
      images: '/logo.png',
    },
  };
}
