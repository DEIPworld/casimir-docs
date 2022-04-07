import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';

export const ClassDetails = {
  name: 'ClassDetails',
  setup() {
    const route = useRoute();
    const store = usePackagesData();
    const { getClassData } = store;
    let contentData = getClassData({ name: route.params.class });

    watch(route, () => {
      contentData = getClassData({ name: route.params.class });
    });
    const generateTableRow = (rowData) => rowData.map((elem) => (
      <tr>
        <td class={'td-types'}>{ elem.name }</td>
        <td class={'td-types'}>{elem.type.names.join('')}</td>
      </tr>
    ));
    const generateTables = (tableData) => {
      if (tableData) {
        return (
          <div >
            <h3>Parameters:</h3>
            <table>
              <tr>
                <th class={'th-params'}>Name</th>
                <th class={'th-params'}>Acceptable types</th>
              </tr>
              { generateTableRow(tableData) }
            </table>
          </div>
        );
      }
      return false;
    };
    const generateAugments = (augmentList) => {
      if (augmentList) {
        return (
        <div>
          <h2>Augments:</h2>
          <ul>
            { augmentList.map((elem) => <li>{elem}</li>)}
          </ul>
        </div>
        );
      }
      return false;
    };
    const generateScopeOf = (scopeof) => {
      if (scopeof) {
        return (
        <h4>Scope: { scopeof }</h4>
        );
      }
      return false;
    };
    const generateMemberOf = (memberof) => {
      if (memberof) {
        return (
        <h4>Member of: { memberof }</h4>
        );
      }
      return false;
    };
    const fullContentData = () => Object.entries(contentData).map((elem) => (
      <div>
        { elem[0] }: { JSON.stringify(elem[1]) }
      </div>
    ));
    const generateClassContent = () => (
      <div>
        <h3 className="feature-type">
          {contentData.kind}
        </h3>
        <h1>{contentData.name}</h1>
        <h3>{contentData.classdesc}</h3>
        { generateScopeOf(contentData.scope) }
        { generateMemberOf(contentData.memberof) }
        { generateTables(contentData.params) }
        { generateAugments(contentData.augments) }
        <h2>{ contentData.package }</h2>
        {/* it's only for develop */}
        <br/>
        <br/>
        { fullContentData() }
      </div>
    );
    return () => (
      generateClassContent()
    );
  }
};
