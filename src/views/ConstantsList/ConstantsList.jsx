import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';

export const ConstantsList = {
  name: 'ConstantsList',
  setup() {
    const route = useRoute();
    const store = usePackagesData();
    const { getConstantsByPackage } = store;
    let contentData = getConstantsByPackage(route.params.package);
    watch(route, () => {
      contentData = getConstantsByPackage(route.params.package);
    });
    const generateList = () => (contentData.length ? contentData.map((elem) => (
    <tr>
      <td className={'td-types'}>{elem.name}</td>
      <td className={'td-types'}>{elem?.params?.length ? JSON.stringify(elem.params) : '--'}</td>
    </tr>
    )) : null);
    return () => (
      <div>
        <h3>constants</h3>
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
