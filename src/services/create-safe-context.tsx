'use client';

import { createContext, useContext, useState, useCallback, useLayoutEffect, useMemo } from 'react';

import { StorageService } from './storage-service';

export const createSafeContext = <T extends object>(
  defaultValue: T,
  strategy?: {
    storage?: StorageService<T>;
    scriptString?: string;
    onChange?: (value: T) => void;
  },
) => {
  type ContextValue = [state: T, setState: (value: Partial<T>) => void, mounted: boolean];
  const context = createContext<ContextValue | undefined>(undefined);

  // 💡 포인트 1: ISR을 위해 nonce를 선택적(Optional)으로 변경
  const Provider = ({ nonce, children }: { nonce?: string; children: React.ReactNode }) => {
    // 💡 포인트 2: useState의 초기값에서 바로 Storage를 체크 (중요!)
    // 이렇게 해야 페이지 이동 시 'defaultValue'로 돌아가지 않고 기존 값을 유지합니다.
    const [state, setStateInternal] = useState<T>(() => {
      if (typeof window !== 'undefined') {
        const stored = strategy?.storage?.get();
        return stored ? { ...defaultValue, ...stored } : defaultValue;
      }
      return defaultValue;
    });

    const [mounted, setMounted] = useState(false);

    const setState = useCallback((value: Partial<T>) => {
      setStateInternal(prev => {
        const newValue = { ...prev, ...value } as T;
        strategy?.storage?.set(newValue);
        strategy?.onChange?.(newValue);
        return newValue;
      });
    }, []);

    const providerValue = useMemo<ContextValue>(() => [state, setState, mounted], [state, setState, mounted]);

    // 💡 포인트 3: 마운트 상태만 관리 (상태 동기화는 위 useState에서 이미 끝남)
    useLayoutEffect(() => {
      const stored = strategy?.storage?.get();
      if (stored) {
        setStateInternal(stored);
        strategy?.onChange?.(stored); // ← 이게 없으면 html 클래스가 Light로 덮어씌워짐
      }
      setMounted(true);
    }, []);

    return (
      <context.Provider value={providerValue}>
        {strategy?.scriptString && (
          <script
            dangerouslySetInnerHTML={{ __html: strategy.scriptString }}
            // 💡 포인트 4: next-themes와 동일한 nonce 처리 로직
            // 서버일 때만 nonce를 넣고, 클라이언트에선 빈 문자열로 하이드레이션 에러 방지
            nonce={typeof window === 'undefined' ? nonce : ''}
            suppressHydrationWarning
          />
        )}
        {children}
      </context.Provider>
    );
  };

  const useSafeContext = () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error('useSafeContext must be used within a Provider');
    }
    return ctx;
  };

  return [Provider, useSafeContext] as const;
};
