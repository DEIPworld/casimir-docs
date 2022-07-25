// import MarkdownIt from 'markdown-it';

// type AbstractObject = { [key: string]: any };

declare module 'filter-where' {
  export default function where(query: { [key: string]: any }): (element: any) => boolean
}

declare module '@toycode/markdown-it-class' {
  export default function markdownItPrism(md: any, mapping: AbstractObject): void;
}
