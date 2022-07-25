import { computed, defineComponent, ref, watchEffect } from 'vue';
import { RouterView, RouterLink, useRoute } from 'vue-router';

import {
  VApp,
  VAppBar,
  VAppBarTitle,
  VMain,
  VNavigationDrawer,
  VSpacer
} from 'vuetify/components';

import { PackagesNavigation } from '@/components/packages/PackagesNavigation';

export const App = defineComponent({
  setup() {
    // const route = useRoute();
    // const hasRightSidebar = ref(false);
    //
    // watchEffect( () => {
    //   hasRightSidebar.value = !!route.meta.hasRightSidebar;
    // });

    // const renderRightSidebar = () => {
    //   if (hasRightSidebar.value) {
    //     <VNavigationDrawer
    //       position="right"
    //       style="padding-right:var(--c-screen-shift)"
    //       width="380"
    //     >
    //       <div id="onPageMenu"/>
    //     </VNavigationDrawer>
    //   }
    //
    //   return null;
    // }

    return () => (
      <VApp>
        <VAppBar border flat style="padding-left:var(--c-screen-shift);padding-right:var(--c-screen-shift)">
          <VAppBarTitle>
            <RouterLink to={{ name: 'home' }}>
              Casimir.Docs
            </RouterLink>
          </VAppBarTitle>
          <VSpacer />
          <div>[nav]</div>
        </VAppBar>

        <VNavigationDrawer style="padding-left:var(--c-screen-shift)" width="380">
          <PackagesNavigation />
        </VNavigationDrawer>

        {/*{renderRightSidebar()}*/}

        <VMain>
          <div class="pa-12">
            <RouterView />
          </div>
        </VMain>
      </VApp>
    )
  }
})
