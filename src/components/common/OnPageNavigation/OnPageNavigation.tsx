import { computed, defineComponent, onMounted, onUpdated, ref, watchEffect } from 'vue';
import { VList, VListItem, VListItemTitle, VListSubheader } from 'vuetify/components';
import { useRoute, useRouter } from 'vue-router';
import { useWindowScroll } from '@vueuse/core';
import { useLayout } from 'vuetify';

type TocLink = {
  label: string,
  link: string,
  rect: number[]
};

export const OnPageNavigation = defineComponent({
  props: {
    target: {
      type: [String, Function],
      required: true
    },
    contentKey: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const { mainStyles } = useLayout()

    const { y: scrollPos } = useWindowScroll();
    const visiblePos = computed(() => scrollPos.value + parseFloat(mainStyles.value.paddingTop as string))

    const contentToc = ref<TocLink[]>([]);

    const getTop = (el: HTMLElement) => {
      return el.getBoundingClientRect().top + document.documentElement.scrollTop;
    }

    const generateToc = () => {
      const targetEl = typeof props.target === 'function'
        ? props.target().value.$el
        : document.querySelector(props.target);

      const headers = targetEl.querySelectorAll('h2');

      const newToc = [...headers].reduce<TocLink[]>((acc, header, index) => {
        const headerId = header.getAttribute('id');

        if (headerId) {
          const label = header.textContent.trim().replace('# ', '');
          const link = headerId;

          const startPos = getTop(header);
          const endPos = headers[index + 1] ? getTop(headers[index + 1]) : window.innerHeight;

          return [...acc, { label, link, rect: [startPos, endPos]}]
        }

        return acc;
      }, [])


      if (JSON.stringify(contentToc.value) !== JSON.stringify(newToc)) {
        contentToc.value = newToc;
      }
    }

    const renderToc = () => contentToc.value
      .map((item) => {
        const isActive = route.hash === item.link;
        const inScroll = computed(() => {
          return visiblePos.value > item.rect[0] && visiblePos.value < item.rect[1];
        })

        return (
          <VListItem href={`${item.link}`} active={isActive}>
            <VListItemTitle>
              {item.label} || {inScroll.value.toString()}
            </VListItemTitle>
          </VListItem>
        )
      });

    watchEffect(() => {

      // const activeToc = contentToc.value
      //   // .find((item) => item.position === visiblePos.value);
      //   .find((item) => item.position === visiblePos.value);
      // console.log(activeToc, visiblePos.value)
      // if (activeToc) {
      //   window.location.hash = activeToc?.link;
      // }
    })

    onMounted(() => generateToc());
    onUpdated(() => generateToc());

    return () => (
      <VList nav density="compact">
        <VListSubheader>On this page</VListSubheader>
        {renderToc()}
      </VList>
    )
  }
})
