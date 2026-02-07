import { cn, VariantProps } from 'dotori-utils';

import { Button } from '@/components/ui/button';

const ActionIconButton = ({ children, className, size, ...props }: ActionIconButtonProps) => (
  <Button className={actionIconButtonStyle({ className, size })} {...props}>
    {children}
  </Button>
);

export default ActionIconButton;

interface ActionIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionIconButtonStyle> {
  children: React.ReactNode;
}

const actionIconButtonStyle = cn('h-full w-full p-0', {
  variants: {
    size: {
      4: '[&_svg]:size-4',
      default: '[&_svg]:size-6',
      8: '[&_svg]:size-8',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});
