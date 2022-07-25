import { defineComponent } from 'vue';

export const ErrorPage = defineComponent({
  setup() {
    return () => (
      <div>
        404 Component Not found
      </div>
    )
  }
})
