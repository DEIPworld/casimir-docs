import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';

export const ComponentDetails = {
  name: 'ComponentDetails',
  setup() {
    const route = useRoute();
    const store = usePackagesData();
    const { getComponentData } = store;
    let contentData = getComponentData(
      { displayName: route.params.component, package: route.params.package }
    );
    watch(route, () => {
      contentData = getComponentData(
        { displayName: route.params.component, package: route.params.package }
      );
    });

    const generateTableColumns = (elem, cols) => cols.map((col) => {
      const certainTypes = ['object', 'boolean'];
      return (
      <td class={'td-types'}>{!certainTypes.includes(typeof elem[col])
        ? elem[col]
        : JSON.stringify(elem[col])}</td>
      );
    });
    const generateTableHeaders = (cols) => cols.map((col) => (
      <th>
        {col}
      </th>
    ));
    const generateTableRow = (rowData, ...cols) => rowData.map((elem) => (
      <tr>
        {generateTableColumns(elem, ...cols)}
      </tr>
    ));
    const generateTables = (tableData, ...cols) => (tableData ? (
      <table>
        <tr>
          {generateTableHeaders(cols)}
        </tr>
        {generateTableRow(tableData, cols)}
      </table>
    ) : null);
    const generateTags = (tags) => (tags ? (
      <div>
        <h3>Tags: </h3>
        {generateTables(tags, 'description', 'title')}
      </div>
    ) : null);
    const generateProps = (props) => (props ? (
      <div>
        <h3>Props: </h3>
        { generateTables(props, 'name', 'description', 'tags', 'type', 'required') }
      </div>
    ) : null);
    const generateEvents = (events) => (events ? (
      <div>
        <h3>Events: </h3>
        { generateTables(events, 'name', 'description', 'type', 'properties')}
      </div>
    ) : null);
    const generateSlots = (slots) => (slots ? (
      <div>
        <h3>Slots: </h3>
        { generateTables(slots, 'name', 'scoped', 'bindings')}
      </div>
    ) : null);
    const generateClassContent = () => (
      <div>
         <h3 className="feature-type">
          component
         </h3>
          <h1>{ contentData.displayName }</h1>
          <h3>{ contentData.description }</h3>
          { generateTags(contentData.tags.requires) }
          { generateProps(contentData.props) }
          { generateEvents(contentData.events) }
          { generateSlots(contentData.slots) }
          <h2>{ contentData.package }</h2>
      </div>
    );
    return () => (
      generateClassContent()
    );
  }
};
