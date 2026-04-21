'use client';

import rehypeHighlight from 'rehype-highlight';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export function getHighlightedHtml(content: string) {
  const result = unified()
    .use(rehypeParse, { fragment: true }) // 전체 HTML 문서가 아닌 조각(fragment)으로 처리
    .use(rehypeHighlight) // 코드 블럭에 hljs 클래스 주입
    .use(rehypeStringify)
    .processSync(content);

  return result.toString();
}
