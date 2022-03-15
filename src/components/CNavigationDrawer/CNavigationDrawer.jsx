export const CNavigationDrawer = {
  name: 'CNavigationDraver',
  setup(props, { slots }) {
    return () => (
      <div class="c-navigation-drawer">
        <div class="c-navigation-drawer__inner">
          {slots.default()}
        </div>
      </div>
    );
  }
};
