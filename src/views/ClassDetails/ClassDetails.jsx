import { useRoute } from 'vue-router';
import { DisplayClass } from '@/components/DisplayClass';

export const ClassDetails = {
  name: 'ClassDetails',
  setup() {
    const route = useRoute();

    const renderClassContent = () => (
      <div>
        {
          <DisplayClass
            params={route.params}
          />
        }
      </div>
    );

    return () => (
      renderClassContent()
    );
  }
};
