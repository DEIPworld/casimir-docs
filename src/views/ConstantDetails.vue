<template>
  <div>
    <div>
      Constant name: {{ feature }}
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';

  export default {
    name: 'ConstantDetails',
    setup() {
      const route = useRoute();
      const feature = computed(() => route.params.constant);
      return {
        feature
      };
    }
  };
</script>

<style scoped>

</style>
