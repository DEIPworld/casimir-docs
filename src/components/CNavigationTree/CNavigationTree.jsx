import { usePackagesData } from '@/stores/packages';

export const CNavigationTree = {
  name: 'CNavigationTree',
  setup() {
    const store = usePackagesData();
    const {
      packages,
      getClassesByPackage,
      getMethodsByPackage,
      getConstantsByPackage,
      getTypesByPackage,
      getComponentsByPackage
    } = store;
    const createRoute = (pack, section, childProps = {}) => ({
      name: section ? `package.${section}` : pack,
      params: {
        package: pack,
        ...childProps
      }
    });
    const generateClasses = (moduleName) => (
      <div class="pack-list__entities">
        <div>{getClassesByPackage(moduleName).length ? 'CLASSES' : ''}</div>
          {getClassesByPackage(moduleName).map((el) => (
          <div className="pack-list__entities-item">
            <router-link to={
              createRoute(
                moduleName.slice(6),
                'class',
                { [el.kind]: el.name || el.displayName, package: el.package.slice(6) }
              ) }>
               {el.name}
            </router-link>
          </div>
          ))
        }
      </div>
    );

    const generateComponents = (moduleName) => (
      <div class="pack-list__entities">
        <div>{getComponentsByPackage(moduleName).length ? 'COMPONENTS' : ''}</div>
          {getComponentsByPackage(moduleName).map((el) => (
            <div className="pack-list__entities-item">
              <router-link to={
                createRoute(
                  moduleName.slice(6),
                  'component',
                  { component: el.displayName, package: el.package.slice(6) }
                ) }>
                {el.displayName}
              </router-link>
            </div>
          ))
        }
      </div>
    );
    const generateMethods = (moduleName) => {
      if (getMethodsByPackage(moduleName).length) {
        return (
          <div className="pack-list__entities">
            <router-link to={createRoute(moduleName.slice(6), 'functions',)}>
              METHODS
            </router-link>
          </div>
        );
      }
      return false;
    };
    const generateConstants = (moduleName) => {
      if (getConstantsByPackage(moduleName).length) {
        return (
        <div className="pack-list__entities">
          <router-link to={ createRoute(moduleName.slice(6), 'constants') }>
          CONSTANTS
          </router-link>
        </div>
        );
      }
      return false;
    };
    const generateTypes = (moduleName) => {
      if (getTypesByPackage(moduleName).length) {
        return (
        <div className="pack-list__entities">
          <router-link to={ createRoute(moduleName.slice(6), 'typedefs') }>
            TYPES
          </router-link>
        </div>
        );
      }
      return false;
    };

    const generateList = () => packages.map((pack) => (
      <div class="pack-list">
        <div class="pack-list__name">{pack.name}</div>
          {generateClasses(pack.name)}
          {generateComponents(pack.name)}
          {generateConstants(pack.name)}
          {generateTypes(pack.name)}
          {generateMethods(pack.name)}
      </div>
    ));
    return () => (
      generateList()
    );
  }
};
