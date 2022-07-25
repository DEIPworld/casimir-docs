import { onMounted, ref } from 'vue';

export function useHooksState() {
  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true
  })
  return {
    isMounted
  }
}
