<template>
  <div>
    <div>
      TypeDefs name: {{ feature }}
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  export default {
    name: 'TypeDefsDetails',
    setup() {
      const route = useRoute();
      const feature = computed(() => route.params.typedef);
      return {
        feature
      };
    }
  };
</script>

<style scoped>

</style>
