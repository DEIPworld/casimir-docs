import { usePackagesData } from '@/stores/packages';

const BASE_TYPES = ['string', 'array', 'boolean', 'function', 'object', '*', 'number', 'null', 'symbol', 'undefined', 'bigint'];

export const DisplayParams = {
  name: 'DisplayParams',
  props: {
    params: {
      type: Array,
      default: () => []
    },
    // TODO: remove
    packageName: { // убрать
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    titleSize: {
      type: [String, Number],
      default: '4'
    }
  },
  setup(props) {
    const { getType } = usePackagesData();

    const renderTitle = () => {
      const CustomTag = `h${props.titleSize}`;
      if (props.params.length) {
        return <CustomTag>{props.title}</CustomTag>;
      }
      return null;
    };

    const displayWarning = (type) => {
      if (type) {
        return <span style='color: red'>✘</span>;
      }
      return null;
    };

    const displayName = (typeName) => {
      if (typeName === '*') {
        return 'any';
      }
      return typeName;
    };

    const renderType = (typeName) => {
      const type = getType(typeName);
      const routeObj = {
        name: 'package.typedefs',
        hash: `#${typeName}`,
        params: {
          // TODO: remove props.packageName after preventing same-named typedefs
          package: type.package || props.packageName
        }
      };

      if (BASE_TYPES.includes(typeName.toLowerCase()) || type.length !== 1) {
        return <div class='prop-content'>{ displayName(typeName) }{ displayWarning(type.length) }</div>;
      }
      return <router-link to={ routeObj }>{ displayName(typeName) }</router-link>;
    };

    const renderTypes = (types) => types.map((type) => {
      if (Array.isArray(type)) {
        return type.map((el) => (renderType(el)));
      }
      return renderType(type);
    });

    const displayType = (type) => {
      if (type) {
        return renderTypes(type.names);
      }
      return '--';
    };

    const renderList = () => {
      if (props.params.length) {
        return props.params.map((elem) => (
          <tr>
            <td>{elem.name}</td>
            <td>{ displayType(elem.type) }</td>
          </tr>
        ));
      }
      return null;
    };

    return () => (
    <div>
      { renderTitle() }
      <table>
        <tr>
          <th>name</th>
          <th>type</th>
        </tr>
        { renderList() }
      </table>
    </div>
    );
  }
};
