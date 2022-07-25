import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { Teleport } from 'vue'
import { VNavigationDrawer } from 'vuetify/components';
import { useHooksState } from '@/composable/hooks';

export const PackagePage = defineComponent({
  setup() {
    const { isMounted } = useHooksState();

    const renderSidebar = () => {
      // if (isMounted.value) {
        return (
          <Teleport to=".v-application__wrap">
            <VNavigationDrawer
              position="right"
              style="padding-right:var(--c-screen-shift)"
              width="380"
            >
              <div id="onPageMenu"/>
            </VNavigationDrawer>
          </Teleport>
        )
      // }

      // return null;
    }

    return () => (
      <>
        <RouterView />
        {renderSidebar()}
      </>
    )
  }
})
