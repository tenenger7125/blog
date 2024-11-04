import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';

import type { Config, PluginAPI } from 'tailwindcss/types/config';

export const plugins: Config['plugins'] = [
  typography,
  plugin(({ addUtilities }: { addUtilities: PluginAPI['addUtilities'] }) => {
    addUtilities({
      '.scrollbar-hide': {
        /* IE and Edge */
        '-ms-overflow-style': 'none',

        /* Firefox */
        'scrollbar-width': 'none',

        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },

      '.scrollbar-default': {
        /* IE and Edge */
        '-ms-overflow-style': 'auto',

        /* Firefox */
        'scrollbar-width': 'auto',

        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'block',
        },
      },
    });
  }),
];
