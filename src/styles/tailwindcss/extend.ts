import { Config } from 'tailwindcss/types/config';

export const extend: Config['theme'] = {
  width: {
    13: '3.25rem',
    112: '28rem',
  },
  height: {
    13: '3.25rem',
    160: '40rem',
  },
  maxWidth: {
    112: '28rem',
    '1/2': '50%',
    '8xl': '84rem',
  },
  screens: {
    '2lg': '1500px',
  },
};
