/* eslint-disable @next/next/no-img-element */
import fs from 'fs/promises';

import GithubSlugger from 'github-slugger';
import { globby, Options } from 'globby';
import { Root, Text } from 'mdast';
import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { visit } from 'unist-util-visit';

import { FOLDER_PATH } from '@/constants/node';

import type { MetaData } from '@/types/post';

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

    const { content, frontmatter } = await compileMDX<MetaData>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkParse, remarkBreaks, extractHeadings, remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'prepend' }],
            [rehypePrism, { showLineNumbers: true }],
          ],
        },
      },
      components: {
        img: props => (
          <Image
            {...props}
            alt={props.alt || ''}
            className="m-0 object-contain"
            height={undefined}
            sizes="(max-width: 768px) 100vw, 1200px"
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${props.src?.replace('/public', '')}`}
            width={undefined}
            fill
            priority
          />
        ),
        // Render code blocks as a plain <pre> so SSR/CSR markup stays identical and avoids hydration mismatch.
      },
    });

    return {
      id,
      source,
      headings,
      component: content,
      metaData: { ...frontmatter, thumbnail: frontmatter.thumbnail?.replace('/public', '') } as MetaData,
    };
  },

  async readFiles(options?: Options & Partial<{ cwd: string }> & Partial<{ page: number; limit: number }>) {
    const defaultOptions = { page: 1, limit: Infinity };
    const { page, limit } = { ...defaultOptions, ...options };

    const fileNames = await this.getFileNames(options);
    const contents = await Promise.all(
      fileNames.map(fileName => this.readFile({ cwd: options?.cwd, id: fileName.replace(/.md$/g, '') })),
    );

    const sortedContentsById = contents.toSorted((a, b) => +b.id - +a.id);

    const [start, end] = [Math.max(0, limit * (page - 1)), Math.min(fileNames.length, limit * page)];
    const sliced = sortedContentsById.slice(start, end);

    return {
      page,
      limit,
      contents: sliced,
      totalPage: Math.ceil(fileNames.length / limit),
      totalCount: fileNames.length,
      currentPageCount: fileNames.length,
    };
  },
};

export type MarkdownFile = Awaited<ReturnType<(typeof markdown)['readFile']>>;
