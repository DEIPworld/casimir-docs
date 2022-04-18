import { DisplayParams } from '@/components/DisplayParams';

export const DisplayMethod = {
  name: 'DisplayMethod',
  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const renderMethodDescription = () => {
      if (props.method.description) {
        return <div>
          <h4>Description:</h4>
          <div>{ props.method.description }</div>
        </div>;
      }
      return null;
    };

    const renderParams = (params) => {
      if (params.length) {
        return (
         <DisplayParams
            params={ params }
            packageName={ props.method.package }
            title='Params'
          />
        );
      }
      return null;
    };

    const renderMethod = () => {
      if (props.method.name) {
        return (<div>
          <h3>{props.method.name}</h3>
          { renderMethodDescription() }
          { renderParams(props.method.params) }

        </div>
        );
      }
      return null;
    };

    return () => (
      renderMethod(props.method)
    );
  }
};
