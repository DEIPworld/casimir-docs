export const CApp = {
  name: 'CApp',
  setup(props, { slots }) {
    return () => (
      <div class="c-app">
        {slots.default()}
      </div>
    );
  }
};
