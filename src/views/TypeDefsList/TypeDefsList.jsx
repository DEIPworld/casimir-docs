import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';

export const TypeDefsList = {
  name: 'TypeDefsList',
  setup() {
    const route = useRoute();
    const store = usePackagesData();
    const { getTypesByPackage } = store;
    let contentData = getTypesByPackage(route.params.package);
    watch(route, () => {
      contentData = getTypesByPackage(route.params.package);
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
