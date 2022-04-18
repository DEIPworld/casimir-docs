import { usePackagesData } from '@/stores/packages';

export const CNavigationTree = {
  name: 'CNavigationTree',
  setup() {
    const {
      packages,
      getClassesByPackage,
      getConstantsByPackage,
      getTypesByPackage,
      getComponentsByPackage,
      getMethodsByMemberOf,
      getMethodsWithError
    } = usePackagesData();

    const createRoute = (pack, section, childProps = {}) => ({
      name: section ? `package.${section}` : pack,
      params: {
        package: pack,
        ...childProps
      }
    });

    const renderClasses = (moduleName) => {
      if (getClassesByPackage(moduleName).length) {
        return (
          <div class="pack-list__entities">
            <div>CLASSES</div>
            {
              getClassesByPackage(moduleName).map((el) => (
              <div class="pack-list__entities-item">
                <router-link to={
                  createRoute(
                    moduleName,
                    'class',
                    { class: el.name, package: el.package }
                  )}>
                  {el.name}
                </router-link>
              </div>
              ))
            }
          </div>
        );
      }
      return null;
    };

    const renderComponents = (moduleName) => {
      if (getComponentsByPackage(moduleName).length) {
        return (
        <div class="pack-list__entities">
          <div>COMPONENTS</div>
          {getComponentsByPackage(moduleName).map((el) => (
          <div class="pack-list__entities-item">
            <router-link to={
              createRoute(
                moduleName,
                'component',
                { component: el.displayName, package: el.package }
              )}>
              {el.displayName}
            </router-link>
          </div>
          ))
          }
        </div>
        );
      }
      return null;
    };

    const displayErrorSign = (moduleName) => {
      if (getMethodsWithError(moduleName).length) {
        return <span style="color: red">✘</span>;
      }
      return null;
    };
    const renderMethods = (moduleName) => {
      if (getMethodsByMemberOf(`module:${moduleName}`).length) {
        return (
          <div class="pack-list__entities">
            <router-link to={createRoute(moduleName, 'functions')}>
              METHODS
            </router-link>
            { displayErrorSign(moduleName) }
          </div>
        );
      }
      return null;
    };

    const renderConstants = (moduleName) => {
      if (getConstantsByPackage(moduleName).length) {
        return (
        <div class="pack-list__entities">
          <router-link to={createRoute(moduleName, 'constants')}>
            CONSTANTS
          </router-link>
        </div>
        );
      }
      return null;
    };

    const renderTypes = (moduleName) => {
      if (getTypesByPackage(moduleName).length) {
        return (
          <div class="pack-list__entities">
            <router-link to={ createRoute(moduleName, 'typedefs') }>
              TYPES
            </router-link>
          </div>
        );
      }
      return null;
    };

    const renderList = () => packages.map((pack) => (
      <div class="pack-list">
        <div class="pack-list__name">{pack.name}</div>
          {renderClasses(pack.name)}
          {renderComponents(pack.name)}
          {renderConstants(pack.name)}
          {renderTypes(pack.name)}
          {renderMethods(pack.name)}
      </div>
    ));

    return () => (
      renderList()
    );
  }
};
