import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePackagesData } from '@/stores/packages';
import { DisplayProp } from '@/components/DisplayProp';

export const ComponentDetails = {
  name: 'ComponentDetails',
  setup() {
    const route = useRoute();
    const { getComponentData } = usePackagesData();
    let content = getComponentData(
      { displayName: route.params.component, package: route.params.package }
    );

    watch(route, () => {
      content = getComponentData(
        { displayName: route.params.component, package: route.params.package }
      );
    });

    const renderTableColumns = (elem, cols) => cols.map((col) => {
      const certainTypes = ['object', 'boolean'];
      if (!certainTypes.includes(typeof elem[col])) {
        return <td>{ elem[col] }</td>;
      }
      return <td>{ JSON.stringify(elem[col]) }</td>;
    });

    const renderTableHeaders = (cols) => cols.map((col) => (
      <th>
        {col}
      </th>
    ));

    const renderTableRow = (rowData, ...cols) => rowData.map((elem) => (
      <tr>
        {renderTableColumns(elem, ...cols)}
      </tr>
    ));

    const renderTables = (tableData, ...cols) => {
      if (tableData) {
        return (
          <table>
            <tr>
              {renderTableHeaders(cols)}
            </tr>
            {renderTableRow(tableData, cols)}
          </table>
        );
      }
      return null;
    };

    const renderTags = (tags) => {
      if (tags) {
        return (
          <div>
            <h3>Tags: </h3>
            {renderTables(tags, 'description', 'title')}
          </div>
        );
      }
      return null;
    };

    const renderEvents = (events) => {
      if (events) {
        return (
         <div>
           <h3>Events: </h3>
           { renderTables(events, 'name', 'description', 'type', 'properties')}
         </div>
        );
      }
      return null;
    };

    const renderSlots = (slots) => {
      if (slots) {
        return (
          <div>
            <h3>Slots: </h3>
            { renderTables(slots, 'name', 'scoped', 'bindings')}
          </div>
        );
      }

      return null;
    };

    const displayProps = (props) => {
      if (props.length) {
        return Object.values(props).map((elem) => <DisplayProp propData={elem}/>);
      }
      return null;
    };

    const renderProps = (props) => {
      if (props) {
        const formattedProps = Object.values(props);
        return (
        <div>
          <h3>Props:</h3>
          { displayProps(formattedProps) }
        </div>
        );
      }
      return null;
    };
    const renderClassContent = () => (
      <div>
         <h3 class="feature-type">
          component
         </h3>
          <h1>{ content.displayName }</h1>
          <h3>{ content.description }</h3>
          { renderTags(content.tags.requires) }
          { renderProps(content.props) }
          { renderEvents(content.events) }
          { renderSlots(content.slots) }
          <h2>{ content.package }</h2>
      </div>
    );

    return () => (
      renderClassContent()
    );
  }
};
