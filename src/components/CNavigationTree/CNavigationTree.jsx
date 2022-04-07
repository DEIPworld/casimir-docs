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
    const generateClasses = (moduleName) => (getClassesByPackage(moduleName).length ? (
      <div class="pack-list__entities">
        <div>CLASSES</div>
          {getClassesByPackage(moduleName).map((el) => (
          <div className="pack-list__entities-item">
            <router-link to={
              createRoute(
                moduleName,
                'class',
                { class: el.name, package: el.package }
              ) }>
               {el.name}
            </router-link>
          </div>
          ))
        }
      </div>
    ) : null);

    const generateComponents = (moduleName) => (getComponentsByPackage(moduleName).length ? (
      <div class="pack-list__entities">
        <div>COMPONENTS</div>
          {getComponentsByPackage(moduleName).map((el) => (
            <div className="pack-list__entities-item">
              <router-link to={
                createRoute(
                  moduleName,
                  'component',
                  { component: el.displayName, package: el.package }
                ) }>
                {el.displayName}
              </router-link>
            </div>
          ))
        }
      </div>
    ) : null);
    const generateMethods = (moduleName) => (getMethodsByPackage(moduleName).length ? (
      (
        <div className="pack-list__entities">
          <router-link to={createRoute(moduleName, 'functions')}>
            METHODS
          </router-link>
        </div>
      )
    ) : null);
    const generateConstants = (moduleName) => (getConstantsByPackage(moduleName).length ? (
      <div className="pack-list__entities">
        <router-link to={ createRoute(moduleName, 'constants') }>
        CONSTANTS
        </router-link>
      </div>
    ) : null);
    const generateTypes = (moduleName) => (getTypesByPackage(moduleName).length ? (
      <div className="pack-list__entities">
        <router-link to={ createRoute(moduleName, 'typedefs') }>
          TYPES
        </router-link>
      </div>
    ) : null);

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
