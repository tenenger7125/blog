import { cn, VariantProps } from 'dotori-utils';

import { Button, ButtonProps } from '@/components/ui/button';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const ActionIconButton = ({ children, className, label, iconSize, ...props }: ActionIconButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button className={actionIconButtonStyle({ className, iconSize })} {...props}>
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

const actionIconButtonStyle = cn('h-full w-full p-0', {
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
