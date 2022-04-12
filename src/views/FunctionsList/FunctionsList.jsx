import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';

export const FunctionsList = {
  name: 'FunctionsList',
  setup() {
    const route = useRoute();
    const store = usePackagesData();
    const { getMethodsByMemberOf, getMethodsWithError } = store;
    const errorList = getMethodsWithError(route.params.package);
    let contentData = getMethodsByMemberOf(`module:${route.params.package}`);
    watch(route, () => {
      contentData = getMethodsByMemberOf(`module:${route.params.package}`);
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
        { errorList ? errorList.map((elem) => (
          <div className={'error'}>{
            `${elem.kind} ${elem.name} has no memberof field or its value is empty, package name: ${elem.package}!!!!`
          }</div>
        )) : null
        }
        <h2>{ route.params.package }</h2>
      </div>
    );
  }
};
