import { EXTERNAL_URL_IN_NODE, INTERNAL_URL_IN_NODE } from '@/constants/node/url';
import { ApiResponse } from '@/types/api';
import { PostDataResponse, PostsSitemapDataResonse } from '@/types/post';
import { requestHttp } from '@/utils/http/request';

import PostViewer from './_components/post-viewer';

const Post = async ({ params: { postId } }: { params: { postId: string } }) => {
  let initialData: ApiResponse<PostDataResponse> | undefined;
  try {
    initialData = await requestHttp.get<PostDataResponse>(`${EXTERNAL_URL_IN_NODE.POSTS}/${postId}`, {
      next: { tags: [`post-${postId}`] },
    });
  } catch {
    // 에러 처리: 포스트를 불러오지 못한 경우, initialData는 undefined로 남겨둡니다.
  }

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col justify-center gap-5">
      <PostViewer initialData={initialData} postId={postId} />
    </div>
  );
};

export default Post;

export async function generateMetadata({ params }: { params: { postId: string } }) {
  try {
    const res = await requestHttp.get<PostDataResponse>(`${INTERNAL_URL_IN_NODE.POSTS}/${params.postId}`);
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
    const res = await requestHttp.get<PostsSitemapDataResonse[]>(EXTERNAL_URL_IN_NODE.POSTS_SITEMAP);
    const posts = res.data ?? [];

    return posts.map(post => ({ postId: post.id.toString() }));
  } catch {
    return []; // 빌드 실패 방지
  }
}

export const revalidate = 3600; // 1시간마다 자동 갱신
