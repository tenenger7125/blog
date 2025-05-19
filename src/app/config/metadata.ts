import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '동그라미 블로그',
  description:
    '이 블로그는 마크다운 파일을 기반으로 학습 리소스 및 프로젝트 소개 등 개발과 관련된 콘텐츠를 정리하고 공유하는 블로그입니다.',
  applicationName: '동그라미 블로그',
  authors: [{ name: 'LEEDONGGYU', url: 'https://github.com/tenenger7125' }],
  keywords: ['blog', 'Next.js'],
  creator: 'tenenger7125',
  publisher: 'github-page',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://tenenger7125.github.io/blog',
    title: '동그라미 블로그',
    description:
      '이 블로그는 마크다운 파일을 기반으로 학습 리소스 및 프로젝트 소개 등 개발과 관련된 콘텐츠를 정리하고 공유하는 블로그입니다.',
    siteName: '동그라미',
    images: [
      {
        url: 'https://tenenger7125.github.io/blog/images/thumbnail/blog.png',
        width: 1200,
        height: 630,
        alt: '동그라미 블로그 썸네일',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: 'https://tenenger7125.github.io/blog/images/thumbnail/blog.png',
  },
};
