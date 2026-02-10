import Link from 'next/link';

import { PATH } from '@/constants';

import { Button } from '../components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { markdown } from '../utils/node/files';

const NotFound = async () => {
  const files = await markdown.readFiles({ page: 1, limit: 2 });

  return (
    <div className="m-auto flex items-center justify-center bg-gradient-to-br px-4">
      <div className="max-w-2xl text-center">
        {/* 404 텍스트 */}
        <div className="mb-8">
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-9xl font-black text-transparent">
            404
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400" />
        </div>

        {/* 제목 */}
        <h2 className="mb-4 text-3xl font-bold dark:text-white md:text-4xl">페이지를 찾을 수 없습니다</h2>

        {/* 설명 */}
        <p className="mb-4 text-lg dark:text-white">
          죄송합니다. 찾고 계신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        {/* 추가 설명 */}
        <p className="mb-8 text-sm dark:text-white">아래의 버튼으로 홈페이지나 블로그 목록으로 돌아갈 수 있습니다.</p>

        {/* 액션 버튼 */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href={PATH.HOME}>
            <Button variant="white">홈으로 가기</Button>
          </Link>
          <Link href={PATH.POSTS}>
            <Button variant="black">블로그 목록</Button>
          </Link>
        </div>

        {/* 추천 콘텐츠 */}
        <div className="mt-16 border-t pt-8 dark:border-white">
          <p className="mb-6 text-sm dark:text-white">최근 블로그 글</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {files.contents.map(file => (
              <Card key={file.id}>
                <CardHeader className="hover:scale-105">
                  <CardTitle>{file.metaData.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{file.metaData.description}</CardDescription>
                  <Button variant="white">보러 가기</Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
