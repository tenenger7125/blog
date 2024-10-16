import { Config } from 'tailwindcss/types/config';

export const extend: Config['theme'] = {
  width: {
    13: '3.25rem',
    112: '28rem',
  },
  height: {
    13: '3.25rem',
  },
  maxWidth: {
    112: '28rem',
    '1/2': '50%',
  },
};
