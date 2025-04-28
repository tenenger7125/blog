import { useCallback, useState } from 'react';

const useDisClosure = (initialIsOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);

  return { isOpen, open, close, toggle };
};

export default useDisClosure;
