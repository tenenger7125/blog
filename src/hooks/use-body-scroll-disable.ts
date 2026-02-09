import { useEffect } from 'react';

const useBodyScrollDisable = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return undefined;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      return undefined;
    };
  }, [enabled]);
};

export default useBodyScrollDisable;
