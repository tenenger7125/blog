import { cn, VariantProps } from 'dotori-utils';

import { Button, ButtonProps } from '@/components/ui/button';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const ActionIconButton = ({ children, className, label, iconSize, ...props }: ActionIconButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button className={actionIconButtonStyle({ className, iconSize })} variant="white" {...props}>
        {children}
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

export default ActionIconButton;

interface ActionIconButtonProps extends ButtonProps, VariantProps<typeof actionIconButtonStyle> {
  children: React.ReactNode;
  label: string;
}

// 'bg-gray-800 dark:hover:bg-gray-100'
const actionIconButtonStyle = cn('h-fit p-0', {
  variants: {
    iconSize: {
      4: '[&_svg]:size-4',
      default: '[&_svg]:size-6',
      8: '[&_svg]:size-8',
    },
  },
  defaultVariants: {
    iconSize: 'default',
  },
});
