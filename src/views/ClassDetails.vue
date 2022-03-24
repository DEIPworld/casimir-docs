<template>
  <div>
    <div>
      Class name: {{ feature }}
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  export default {
    name: 'ClassDetails',
    setup() {
      const route = useRoute();
      const feature = computed(() => route.params.class);
      return {
        feature
      };
    }
  };
</script>

<style scoped>

</style>
