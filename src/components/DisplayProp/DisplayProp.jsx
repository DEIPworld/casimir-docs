// import { usePackagesData } from '@/stores/packages';

export const DisplayProp = {
  name: 'DisplayProp',
  props: {
    propData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const localProp = props.propData;

    const renderDescription = () => {
      if (localProp.description) {
        return (
        <div>
          <h4>Description: </h4>
          <div>{localProp.description}</div>
        </div>
        );
      }
      return null;
    };

    const renderTag = () => localProp.tags.example.map((elem) => (
    <table>
      <tr>
        <th> title: </th>
        <th>description: </th>
      </tr>
      <tr>
        <td>{elem.title}</td>
        <td>{elem.description}</td>
      </tr>
    </table>
    ));

    const renderTagsSection = () => {
      if (localProp.tags?.example.length) {
        return (
        <div>
          <h4>tags:</h4>
          {renderTag()}
        </div>
        );
      }
      return null;
    };
    return () => (
    <div>
      <h3>{localProp.name}</h3>
      { renderDescription() }
      { renderTagsSection() }
    </div>
    );
  }
};
