import { useRoute } from 'vue-router';
import { ClassDetails } from '@/components/class/ClassDetails';
import { defineComponent } from 'vue';

export const ClassDetailsPage = defineComponent({
  setup() {
    const route = useRoute();

    const renderClassContent = () => (
      <div>
        {
          <ClassDetails
            params={route.params}
          />
        }
      </div>
    );

    return () => (
      renderClassContent()
    );
  }
});
