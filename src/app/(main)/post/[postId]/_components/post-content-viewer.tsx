'use client';

import parse, { Element } from 'html-react-parser';
import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';

import 'react-photo-view/dist/react-photo-view.css';

const PostContentViewer = ({ html }: { html: string }) => (
  <PhotoProvider>
    {parse(html, {
      replace(node) {
        if (!(node instanceof Element)) return undefined;

        if (node.name === 'img') {
          return (
            <PhotoView src={node.attribs.src}>
              <Image
                {...node.attribs}
                alt={node.attribs.alt}
                className="cursor-zoom-in"
                height={Number(node.attribs.height) || 600}
                src={node.attribs.src}
                style={{ height: 'auto', width: '100%' }}
                width={Number(node.attribs.width) || 800}
                priority
              />
            </PhotoView>
          );
        }

        return undefined;
      },
    })}
  </PhotoProvider>
);

export default PostContentViewer;
