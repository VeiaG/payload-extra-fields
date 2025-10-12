import defaultComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';



export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    //eslint-disable-next-line 
    img: (props) => <ImageZoom {...(props as any)} />,
    ...components,
  };
}