import fs from 'fs/promises';

import { globby, Options } from 'globby';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { FOLDER_PATH } from '@/constants/node';

export const markdown = {
  async getFileNames(options?: Options) {
    const fileNames = await globby('**/*.md', { cwd: FOLDER_PATH.POSTS_ROOT, ...options });

    return fileNames;
  },

  async readFile({ cwd, id }: { cwd?: string; id: string }) {
    const fileName = `${id}.md`;
    const source = await fs.readFile(`${cwd ?? FOLDER_PATH.POSTS_ROOT}/${fileName}`, 'utf-8');
    const { content, frontmatter } = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'prepend' }],
            [rehypePrism, { showLineNumbers: true }],
          ],
        },
      },
    });

    return {
      id,
      source,
      component: content,
      metaData: frontmatter,
    };
  },

  async readFiles(options?: Options & { cwd: string }) {
    const fileNames = await this.getFileNames(options);
    const contents = await Promise.all(
      fileNames.map(fileName => this.readFile({ cwd: options?.cwd, id: fileName.replace(/.md$/g, '') })),
    );

    return contents;
  },
};
