import { useRoute } from 'vue-router';
import { defineComponent, watch } from 'vue';
import { usePackagesData } from '@/stores/packages';
import { DisplayParams } from '@/components/params/DisplayParams';

export const ConstantsList = defineComponent({
  name: 'ConstantsList',
  setup() {
    const route = useRoute();
    const { getConstantsByPackage } = usePackagesData();

    let content = getConstantsByPackage(route.params.package);
    watch(route, () => {
      content = getConstantsByPackage(route.params.package);
    });

    const displayParams = (elem) => {
      if (elem.params?.length) {
        return (
        <DisplayParams
          params={elem.params}
          packageName={route.params.package}
          title='Params'
        />
        );
      }
      return null;
    };

    const renderList = () => {
      if (content.length) {
        return content.map((elem) => (
        <div>
          <h3>{ elem.name }</h3>
          { displayParams(elem) }
        </div>
        ));
      }
      return null;
    };

    return () => (
      <div>
        <h3>constants</h3>
        { renderList() }
        <h2>{ route.params.package }</h2>
      </div>
    );
  }
});
