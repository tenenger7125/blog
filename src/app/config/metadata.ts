import { Metadata } from 'next';

const title = '동그라미 블로그';
const description =
  '이 블로그는 마크다운 파일을 기반으로 학습 리소스 및 프로젝트 소개 등 개발과 관련된 콘텐츠를 정리하고 공유하는 블로그입니다.';

export const metadata: Metadata = {
  title,
  description,
  applicationName: title,
  authors: [{ name: 'LEEDONGGYU', url: 'https://github.com/tenenger7125' }],
  keywords: ['blog', 'Next.js'],
  creator: 'tenenger7125',
  publisher: 'vercel',
  robots: 'index, follow',
  metadataBase: new URL('https://blog-nu-dun-70.vercel.app'),
  openGraph: {
    type: 'website',
    url: 'https://blog-nu-dun-70.vercel.app',
    title,
    description,
    siteName: '동그라미',
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
    title,
    description,
    images: '/logo.png',
  },
};
