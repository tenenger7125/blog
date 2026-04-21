'use client';

import * as cheerio from 'cheerio';
import { slug } from 'github-slugger';

export type Heading = {
  tag: string;
  text: string;
  id: string;
  depth: number;
};

export function extractHeadings(html: string): Heading[] {
  const $ = cheerio.load(html);
  const headings: Heading[] = [];

  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const text = $(el).text().trim();
    const id = slug(text); // "나의 제목" → "나의-제목"

    // heading에 id 자동 주입 (앵커 이동용)
    $(el).attr('id', id);

    headings.push({
      tag: el.tagName,
      text,
      id,
      depth: parseInt(el.tagName.replace('h', ''), 10),
    });
  });

  // id가 주입된 html도 같이 반환
  return headings;
}

export function injectHeadingIds(html: string): string {
  const $ = cheerio.load(html);

  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const text = $(el).text().trim();
    $(el).attr('id', slug(text));
    $(el).attr('style', 'scroll-margin-top: 80px');
  });

  return $('body').html() ?? html;
}
