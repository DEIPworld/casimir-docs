<template>
  <div>
    <div>
      Function name: {{ feature }}
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  export default {
    name: 'FunctionDetails',
    setup() {
      const route = useRoute();
      const feature = computed(() => route.params.function);
      return {
        feature
      };
    }
  };
</script>

<style>

</style>
