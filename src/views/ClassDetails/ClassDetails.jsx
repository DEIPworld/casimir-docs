import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';

export const ClassDetails = {
  name: 'ClassDetails',
  setup() {
    const route = useRoute();
    const store = usePackagesData();
    const { getClassData, getMethodsByMemberOf, getMembersByClassName } = store;
    let contentData = getClassData({ name: route.params.class });
    let descendantMethods = getMethodsByMemberOf(contentData.longname);
    let descendantMembers = getMembersByClassName(
      { name: route.params.package, class: route.params.class, kind: 'member' }
    );

    watch(route, () => {
      contentData = getClassData({ name: route.params.class });
      if (contentData) {
        descendantMethods = getMethodsByMemberOf(contentData.longname);
        descendantMembers = getMembersByClassName(
          { memberof: contentData.longname, kind: 'member' }
        );
      }
    });
    const generateTableRow = (rowData) => rowData.map((elem) => (
      <tr>
        <td class={'td-types'}>{ elem.name }</td>
        <td class={'td-types'}>{elem.type.names.join('')}</td>
      </tr>
    ));
    const generateTables = (tableData) => (tableData ? (
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
    ) : null);
    const generateAugments = (augmentList) => (augmentList ? (
      <div>
        <h2>Augments:</h2>
        <ul>
          { augmentList.map((elem) => <li>{elem}</li>)}
        </ul>
      </div>
    ) : null);
    const generateScopeOf = (scopeof) => (scopeof ? (
        <h4>Scope: { scopeof }</h4>
    ) : null);
    const generateMemberOf = (memberof) => (memberof ? (
        <h4>Member of: { memberof }</h4>
    ) : null);
    const generateListItem = (list) => list.map((item) => (item.name ? (
      <li>{item.name}</li>
    ) : null));
    const generateMethodsList = () => (descendantMethods.length ? (
      <div>
        <h3>Class Methods:</h3>
        <ul>
          {generateListItem(descendantMethods)}
        </ul>
      </div>
    ) : null);
    const generateMembersList = () => (descendantMembers.length ? (
    <div>
      <h3>Class Members:</h3>
      <ul>
        {generateListItem(descendantMembers)}
      </ul>
    </div>
    ) : null);
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
        { generateMethodsList() }
        { generateMembersList() }
      </div>
    );
    return () => (
      generateClassContent()
    );
  }
};
