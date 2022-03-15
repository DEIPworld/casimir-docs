export const CMain = {
  name: 'CMain',
  setup(props, { slots }) {
    return () => (
      <div class="c-main">
        <div class="c-main__inner">
          {slots.default()}
        </div>
      </div>
    );
  }
};
