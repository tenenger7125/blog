import { defaultTheme } from './defaultTheme';
import { extend } from './extend';

import type { Config } from 'tailwindcss/types/config';

export const theme: Config['theme'] = {
  ...defaultTheme,
  extend,
};
