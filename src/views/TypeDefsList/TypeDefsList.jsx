import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';

export const TypeDefsList = {
  name: 'TypeDefsList',
  setup() {
    const route = useRoute();
    const { getTypesByPackage } = usePackagesData();

    let content = getTypesByPackage(route.params.package);

    watch(route, () => {
      content = getTypesByPackage(route.params.package);
    });

    const renderTypes = (arr) => arr.map((elem) => (
      <div>{ elem }</div>
    ));

    const parseType = (type) => (type?.names.length ? renderTypes(type.names) : '--');

    const renderList = () => {
      if (content.length) {
        return content.map((elem) => (
          <tr>
            <td id={elem.name} class='td-types'>{elem.name}</td>
            <td class='td-types'>{parseType(elem.type)}</td>
          </tr>
        ));
      }
      return null;
    };

    return () => (
    <div>
      <h3>types</h3>
      <table>
        <tr>
          <th class='th-params'>name</th>
          <th class='th-params'>params</th>
        </tr>
        { renderList() }
      </table>
      <h2>{ route.params.package }</h2>
    </div>
    );
  }
};
