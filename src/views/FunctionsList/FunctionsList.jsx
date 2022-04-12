import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';

export const FunctionsList = {
  name: 'FunctionsList',
  setup() {
    const route = useRoute();
    const store = usePackagesData();
    const { getMethodsByPackage } = store;
    let contentData = getMethodsByPackage(route.params.package);
    watch(route, () => {
      contentData = getMethodsByPackage(route.params.package);
    });
    const generateList = () => (contentData.length ? contentData.map((elem) => (
      <tr>
        <td className={'td-types'}>{elem.name}</td>
        <td className={'td-types'}>{elem?.params?.length ? JSON.stringify(elem.params) : '--'}</td>
      </tr>
    )) : null);
    return () => (
      <div>
        <h3>methods</h3>
        <table>
          <tr>
            <th className={'th-params'}>name</th>
            <th className={'th-params'}>params</th>
          </tr>
          { generateList() }
        </table>

        <h2>{ route.params.package }</h2>
      </div>
    );
  }
};
