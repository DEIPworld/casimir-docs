export const CAppBar = {
  name: 'CAppBar',
  setup(props, { slots }) {
    return () => (
      <div class="c-app-bar">
        <div class="c-app-bar__inner">
          {slots.default()}
        </div>
      </div>
    );
  }
};
