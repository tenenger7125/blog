'use client';

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import useBodyScrollDisable from '@/hooks/use-body-scroll-disable';

const Page = () => {
  console.log('Rendering New Post Page');

  useBodyScrollDisable();
  return (
    <>
      <SimpleEditor />
    </>
  );
};

export default Page;
