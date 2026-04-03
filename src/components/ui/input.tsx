import * as React from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'> & VariantProps<typeof inputVariants>>(
  ({ className, type, ...props }, ref) => (
    <input ref={ref} className={cn(inputVariants({ variant: props.variant }), className)} type={type} {...props} />
  ),
);
Input.displayName = 'Input';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500',
      },
      sizing: {
        lg: 'h-11 px-4 py-2 text-2xl file:text-base file:font-medium ',
        default: 'h-9 px-3 py-1 text-base file:text-sm file:font-medium ',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizing: 'default',
    },
  },
);

export { Input };
