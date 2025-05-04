'use client';

import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';

import { Icon } from 'dotori-icons';
import { cn } from 'dotori-utils';

const CodeBlock = ({ className, ...rest }: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const preRef = useRef<HTMLPreElement>(null);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (!code) return;

    try {
      setIsLoading(true);
      await navigator.clipboard.writeText(code);
    } catch {
      console.warn('copy is not working');
    } finally {
      setIsLoading(false);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  return (
    <div className="relative">
      <button
        aria-label={isCopied ? 'Copied' : 'Copy'}
        className="absolute right-0 top-0 flex items-center gap-2 rounded bg-black px-3 py-2 text-white"
        disabled={isCopied || isLoading}
        onClick={handleClickCopy}>
        <span className="fill-white">{isCopied ? <Icon icon="check" /> : <Icon icon="contentCopy" />}</span>
        <span>{isCopied ? 'Copied !' : 'Copy'}</span>
      </button>

      <pre ref={preRef} {...rest} className={preStyle({ className })} />
    </div>
  );
};

const preStyle = cn('flex');

export default CodeBlock;
