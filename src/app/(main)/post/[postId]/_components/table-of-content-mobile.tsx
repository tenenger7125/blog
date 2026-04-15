'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import type { Heading } from '@/lib/node/heading';

const TableOfContentMobile = ({ headings }: { headings: Heading[] }) => (
  <Accordion className="rounded-lg border px-4" type="single" collapsible>
    <AccordionItem className="border-none" value="toc">
      <AccordionTrigger className="text-sm font-medium">목차</AccordionTrigger>
      <AccordionContent>
        <ul className="flex flex-col gap-1">
          {headings.map(h => (
            <li key={h.id} style={{ paddingLeft: `${(h.depth - 1) * 12}px` }}>
              <a
                className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-gray-100"
                href={`#${h.id}`}>
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default TableOfContentMobile;
