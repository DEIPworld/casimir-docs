import { usePackagesData } from '@/stores/packages';
import { defineComponent } from 'vue';

export const ExamplesDetails = defineComponent({
  setup() {
    const { getExamples } = usePackagesData();

    const renderList = () => getExamples.map((elem) => (<div>{elem}</div>));

    return () => (
    <div>
      { renderList() }
    </div>
    );
  }
});
