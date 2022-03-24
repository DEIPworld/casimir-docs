import { usePackagesData } from '@/stores/packages';

export const CNavigationTree = {
  name: 'CNavigationTree',
  setup() {
    const store = usePackagesData();
    const {
      packages, getClasses, getMethods, getComponents, getTypes, getConstants
    } = store;
    const clearList = (arr) => arr.filter(
      (elem) => elem.content.length > 0
    );
    const showVerboseFeature = (moduleName, feature) => {
      const list = clearList(feature);
      return list.filter((el) => el.moduleName === moduleName).map(
        (listItem) => listItem.content.map((item) => {
          if (item.el.name || item.el.displayName) {
            return (
            <li class="pack-list__entities-item">
              <router-link to={item.routeData}>
                {item.el.name || item.el.displayName}
              </router-link>
            </li>
            );
          }
          return false;
        })
      );
    };
    const showNotVerboseFeature = (moduleName, feature, featureName) => {
      const list = clearList(feature);
      return list.filter((el) => el.moduleName === moduleName).map(
        (listItem) => (
          <router-link to={listItem.routeData}>
            <div>{featureName}</div>
          </router-link>
        )
      );
    };
    const showList = () => packages.map((pack) => (
      <ul class="pack-list">
        <div class="pack-list__name">{pack.name}</div>
         <ul class="pack-list__entities">
          <div>{showVerboseFeature(pack.name, getClasses).length ? 'CLASSES' : ''}</div>
          {showVerboseFeature(pack.name, getClasses)}
         </ul>
        <ul className="pack-list__entities">
          <div>{showVerboseFeature(pack.name, getComponents).length ? 'COMPONENTS' : ''}</div>
            {showVerboseFeature(pack.name, getComponents)}
        </ul>
        <ul className="pack-list__entities">
          {showNotVerboseFeature(pack.name, getConstants, 'CONSTANTS')}
        </ul>
        <ul className="pack-list__entities">
          {showNotVerboseFeature(pack.name, getTypes, 'TYPES')}
        </ul>
        <ul class="pack-list__entities">
          {showNotVerboseFeature(pack.name, getMethods, 'METHODS')}
        </ul>
      </ul>
    ));
    return () => (
      showList()
    );
  }
};
