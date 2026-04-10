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
    <div className="flex min-h-screen items-center justify-center">
      <p>로그인 세션을 연장하고 있습니다. 잠시만 기다려 주세요...</p>
    </div>
  );
}
