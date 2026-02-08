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
  // ✅ mounted 상태 추가
  type ContextValue = [state: T, setState: (value: Partial<T>) => void, mounted: boolean];

  const context = createContext<ContextValue | undefined>(undefined);

  const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state, setStateInternal] = useState<T>(defaultValue);
    const [mounted, setMounted] = useState(false);

    const setState = useCallback((value: Partial<T>) => {
      setStateInternal(prev => {
        const newValue = { ...prev, ...value } as T;
        strategy?.storage?.set(newValue);
        strategy?.onChange?.(newValue);
        return newValue;
      });
    }, []);

    // ✅ 올바른 providerValue 메모이제이션
    const providerValue = useMemo<ContextValue>(() => [state, setState, mounted], [state, setState, mounted]);

    // ✅ 마운트 후 실제 storage 값으로 동기화
    useLayoutEffect(() => {
      const stored = strategy?.storage?.get();
      if (stored) {
        setStateInternal(stored);
      }
      setMounted(true); // ✅ 마운트 완료 표시
    }, []);

    return (
      <context.Provider value={providerValue}>
        {strategy?.scriptString && (
          <script dangerouslySetInnerHTML={{ __html: strategy.scriptString }} suppressHydrationWarning />
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
