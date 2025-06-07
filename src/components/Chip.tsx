'use client';

import dynamic from 'next/dynamic';

const DotoriChip = dynamic(() => import('dotori-components').then(mod => mod.Chip), { ssr: false });

const Chip = (props: ChipProps) => (
  <>
    <DotoriChip {...props} />
  </>
);

interface ChipProps extends React.ComponentProps<typeof DotoriChip> {}

export default Chip;
