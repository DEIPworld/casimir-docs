import { defineComponent, onMounted, onUpdated, ref, watchEffect } from 'vue';

import MarkdownIt from 'markdown-it';

import markdownItPrism  from 'markdown-it-prism';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItAnchor from 'markdown-it-anchor';

export const MdParser = defineComponent({
  props: {
    source: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const md = ref();

    const renderMarkdown = () => {
      const markdown = new MarkdownIt();

      const classMapping = {
        h1: 'text-h3',
        h2: 'text-h4',
        h3: 'text-h5',
        // h4: 'text-h5',
        // h5: 'text-h6',
        // h6: 'text-body-2',
        p: 'text-body-2'
      }

      markdown.use(markdownItPrism, { defaultLanguageForUnknown: 'javascript' })
      markdown.use(markdownItClass, classMapping)
      markdown.use(markdownItAnchor, {
        level: 2,
        permalink: markdownItAnchor.permalink.linkInsideHeader({
          symbol: '#',
          placement: 'before'
        })
      })

      md.value = markdown.render(props.source);
    };

    watchEffect(() => renderMarkdown())

    return () => (
      <div class="article" innerHTML={md.value} />
    )
  }
})
