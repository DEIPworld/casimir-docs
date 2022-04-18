import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';
import { DisplayMethod } from '@/components/DisplayMethod';

export const FunctionsList = {
  name: 'FunctionsList',
  setup() {
    const route = useRoute();
    const { getMethodsByMemberOf, getMethodsWithError } = usePackagesData();

    const errorList = getMethodsWithError(route.params.package);
    let content = getMethodsByMemberOf(`module:${route.params.package}`);

    watch(route, () => {
      content = getMethodsByMemberOf(`module:${route.params.package}`);
    });

    const renderList = () => {
      if (content.length) {
        return content.map((elem) => <DisplayMethod method={elem} />);
      }

      return null;
    };

    const renderError = () => {
      if (errorList) {
        return errorList.map((elem) => (
          <div style="color: red">
            {
              `${elem.kind} ${elem.name} has no memberof field or its value is empty, package name: ${elem.package}!!!!`
            }
          </div>
        ));
      }
      return null;
    };

    return () => (
      <div>
        <h2>methods</h2>
        { renderList() }
        { renderError() }
        <h2>{ route.params.package }</h2>
      </div>
    );
  }
};
