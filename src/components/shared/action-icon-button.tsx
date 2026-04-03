import { forwardRef } from 'react';

import { cn, VariantProps } from 'dotori-utils';

import { Button, ButtonProps } from '@/components/ui/button';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const ActionIconButton = forwardRef<HTMLButtonElement, ActionIconButtonProps>(
  ({ children, className, label, iconSize, ...props }, ref) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button ref={ref} className={actionIconButtonStyle({ className, iconSize })} variant="white" {...props}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  ),
);
export default ActionIconButton;

ActionIconButton.displayName = 'ActionIconButton'; // 디버깅을 위해 이름을 설정합니다.

interface ActionIconButtonProps extends ButtonProps, VariantProps<typeof actionIconButtonStyle> {
  children: React.ReactNode;
  label: string;
}

// 'bg-gray-800 dark:hover:bg-gray-100'
const actionIconButtonStyle = cn('h-fit p-0', {
  variants: {
    iconSize: {
      default: '[&_svg]:size-4',
      6: '[&_svg]:size-6',
      8: '[&_svg]:size-8',
    },
  },
  defaultVariants: {
    iconSize: 'default',
  },
});
