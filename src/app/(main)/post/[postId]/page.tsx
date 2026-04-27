import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { EXTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { postQueryKey } from '@/hooks/queries/post/post-query-key';
import { PostDataResponse, PostsSitemapDataResonse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import PostViewer from './_components/post-viewer';

const Post = async ({ params: { postId } }: { params: { postId: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: postQueryKey.post.one({ postId }).queryKey,
    queryFn: async () =>
      requestHttp.get<PostDataResponse>(`${EXTERNAL_URL_IN_NODE.POSTS}/${postId}`, {
        next: { tags: ['post', `post-${postId}`] },
      }),
  });

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-center gap-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostViewer postId={postId} />
      </HydrationBoundary>
    </div>
  );
};

export default Post;

export async function generateMetadata({ params }: { params: { postId: string } }) {
  try {
    const res = await requestHttp.get<PostDataResponse>(`${EXTERNAL_URL_IN_NODE.POSTS}/${params.postId}`);
    const post = res.data;
    if (!post) {
      return {};
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

    // ... 기존 메타데이터 로직
  } catch {
    return {}; // ✅ 에러 시 fallback
  }
}

export async function generateStaticParams() {
  try {
    const res = await requestHttp.get<PostsSitemapDataResonse[]>(EXTERNAL_URL_IN_NODE.POSTS_SITEMAP, {
      next: { tags: ['posts'] },
    });
    const posts = res.data ?? [];

    return posts.map(post => ({ postId: post.id.toString() }));
  } catch {
    return []; // 빌드 실패 방지
  }
}

export const revalidate = 3600;
export const dynamicParams = true;
