/* eslint-disable jsx-a11y/alt-text */
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';

const NextImage = (props: ImageProps) => <Image {...props} src={resolveImageSrc(props.src)} />;

const resolveImageSrc = (src: string | StaticImport) => {
  if (isStaticImport(src)) return src;

  return `${process.env.NEXT_PUBLIC_BASE_PATH}${src}`;
};

const isStaticImport = (src: unknown): src is StaticImport =>
  typeof src === 'object' && src !== null && 'src' in src && 'width' in src && 'height' in src;

export default NextImage;
