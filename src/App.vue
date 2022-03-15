<template>
  <div class="app">
    <CAppBar>
      <div>Logo</div>
      <div class="spacer"></div>
      <div>[nav]</div>
    </CAppBar>

    <CNavigationDrawer>
      [nav]
    </CNavigationDrawer>

    <CMain>
      <RouterView />
    </CMain>
  </div>
</template>

<script>
  import { CApp } from '@/components/CApp';
  import { CAppBar } from '@/components/CAppBar';
  import { CNavigationDrawer } from '@/components/CNavigationDrawer';
  import { CMain } from '@/components/CMain';

  export default {
    name: 'HomeView',

    components: {
      CApp,
      CAppBar,
      CNavigationDrawer,
      CMain
    },
  };
</script>

<style lang="scss">
  *, :before, :after {
    box-sizing: border-box;
  }

  body {
    width: 100%;
    min-width: 320px;
    min-height: 100vh;

    margin: 0;
    padding: 0;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    --c-screen-max-width: 1400px;
    --c-screen-shift: calc((100vw - var(--c-screen-max-width)) / 2);

    --c-navigation-drawer-width: 280px;
    --c-app-bar-height: 64px;

    --c-border-color: #{rgba(#000, .12)};
  }

  .spacer {
    flex: 1;
  }
</style>
