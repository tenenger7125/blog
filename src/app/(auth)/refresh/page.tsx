'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { PATH } from '@/constants';
import { INTERNAL_URL_IN_CLIENT } from '@/constants/url';
import { requestHttp } from '@/utils/http/request';

export default function ReissuePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  useEffect(() => {
    let isSubscribed = true;

    const syncToken = async () => {
      const res = await requestHttp.post(INTERNAL_URL_IN_CLIENT.REFRESH);
      if (res.ok) {
        router.replace(callbackUrl || PATH.HOME);
      } else {
        router.replace(PATH.LOGIN);
      }
    };

    if (isSubscribed) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      syncToken();
    }

    return () => {
      isSubscribed = false;
    };
  }, [router, callbackUrl]);

  return (
    <div className="absolute left-0 top-0 m-auto flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-12 py-10 text-center shadow-sm">
        {/* 텍스트 */}
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium text-gray-900">로그인 세션 연장 중</p>
          <p className="text-sm leading-relaxed text-gray-500">
            잠시만 기다려 주세요.
            <br />곧 자동으로 이동합니다.
          </p>
        </div>

        {/* 점 애니메이션 */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
