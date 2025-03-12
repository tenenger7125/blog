import fs from 'fs/promises';

import GithubSlugger from 'github-slugger';
import { globby, Options } from 'globby';
import { Root, Text } from 'mdast';
import dynamic from 'next/dynamic';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

import { FOLDER_PATH } from '@/constants/node';

import type { Post } from '@/types/post';

const CodeBlock = dynamic(() => import('../../app/posts/[postId]/_components/CodeBlock'), { ssr: false });

const getHeadingsWithHash = () => {
  const headings: { depth: number; title: string; link: string }[] = [];

  const extractHeadings = () => (tree: Root) => {
    const slugger = new GithubSlugger();

    visit(tree, 'heading', node => {
      const text = node.children
        .filter((child): child is Text => child.type === 'text')
        .map(child => child.value)
        .join('');
      const link = `#${slugger.slug(text)}`;

      headings.push({ depth: node.depth, title: text, link });
    });
  };

  return { extractHeadings, headings };
};

export const markdown = {
  async getFileNames(options?: Options) {
    const fileNames = await globby('**/*.md', { cwd: FOLDER_PATH.POSTS_ROOT, ...options });

    return fileNames;
  },

  async readFile({ cwd, id }: { cwd?: string; id: string }) {
    const fileName = `${id}.md`;
    const source = await fs.readFile(`${cwd ?? FOLDER_PATH.POSTS_ROOT}/${fileName}`, 'utf-8');
    const { extractHeadings, headings } = getHeadingsWithHash();

    const { content, frontmatter } = await compileMDX<Post['metaData']>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkParse, extractHeadings, remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'prepend' }],
            [rehypePrism, { showLineNumbers: true }],
          ],
        },
      },
      components: {
        img: props => <img {...props} alt={props.alt} src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${props.src}`} />,
        pre: CodeBlock,
      },
    });

    return {
      id,
      source,
      headings,
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
