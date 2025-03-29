import React from 'react';

import { cn, VariantProps } from 'dotori-utils';

const Breadcrumb = ({ separator = '/', separatorMargin, separatorClassName, children, ...rest }: BreadcrumbProps) => {
  const items = React.Children.toArray(children);

  return (
    <div {...rest}>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className={separatorStyle({ className: separatorClassName, separatorMargin })}>{separator}</span>
          )}
          {child}
        </React.Fragment>
      ))}
    </div>
  );
};

interface BreadcrumbProps extends VariantProps<typeof separatorStyle>, React.ComponentPropsWithoutRef<'div'> {
  separator?: string;
  separatorClassName?: string;
}

const separatorStyle = cn('', {
  variants: {
    separatorMargin: {
      xs: 'mx-2',
      sm: 'mx-4',
      md: 'mx-6',
      lg: 'mx-8',
    },
  },
  defaultVariants: {
    separatorMargin: 'sm',
  },
});

export default Breadcrumb;
