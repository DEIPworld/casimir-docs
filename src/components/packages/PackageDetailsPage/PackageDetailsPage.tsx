import { computed, defineComponent, ref } from 'vue';
import { xxx } from '@/stores/packages';
import { useRoute } from 'vue-router';
import { MdParser } from '@/components/common/MdParser';
import { Teleport } from 'vue'
import { useHooksState } from '@/composable/hooks';

import { OnPageNavigation } from '@/components/common/OnPageNavigation';

export const PackageDetailsPage = defineComponent({
  setup() {
    const route = useRoute();

    const {
      getPackageByUrlName
    } = xxx();

    const content = ref(null);

    const packageData = computed(() => getPackageByUrlName(route.params.package as string) || { description: '' });

    const { isMounted } = useHooksState();

    const renderMenu = () => {
      if (isMounted.value) {
        return (
          <Teleport to="#onPageMenu">
            <OnPageNavigation
              target={() => content}
              contentKey={route.params.package as string}
            />
          </Teleport>
        )
      }

      return null;
    }

    return () => (
      <>
        <MdParser
          ref={content}
          source={packageData.value.description}
        />
        {renderMenu()}
      </>
    )
  }
})
