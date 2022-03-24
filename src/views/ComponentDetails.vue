<template>
  <div>
    <div>
      Component name: {{ feature }}
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  export default {
    name: 'ComponentDetails',
    setup() {
      const route = useRoute();
      const feature = computed(() => route.params.component);
      return {
        feature
      };
    }
  };
</script>

<style scoped>

</style>
