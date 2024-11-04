import { plugins } from './src/styles/tailwindcss/plugins';
import { theme } from './src/styles/tailwindcss/theme';

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme,
  plugins,
};
export default config;
