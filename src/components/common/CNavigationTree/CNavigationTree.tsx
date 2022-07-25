import { usePackagesData } from '@/stores/packages';
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

import {
  VList,
  VListItem,
  VListGroup,

} from 'vuetify/components';

export const CNavigationTree = defineComponent({
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

    const renderClasses = (moduleName) => {
      if (getClassesByPackage(moduleName).length) {
        return (
          <div class="pack-list__entities">
            <div>CLASSES</div>
            {
              getClassesByPackage(moduleName).map((el) => {
                return (
                  <div class="pack-list__entities-item">
                    <RouterLink to={{
                      name: 'package.class',
                      params: { class: el.name, package: el.package }
                    }}>
                      {el.name}
                    </RouterLink>
                  </div>
                )
              })
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
            <RouterLink to={{
              name: 'package.component',
              params: { component: el.displayName, package: el.package }
            }}>
              {el.name}
            </RouterLink>
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
            <RouterLink to={{
              name: 'package.functions',
              params: { package: moduleName }
            }}>
              Methods
            </RouterLink>
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
          <RouterLink to={{
            name: 'package.constants',
            params: { package: moduleName }
          }}>
            Constants
          </RouterLink>
        </div>
        );
      }
      return null;
    };

    const renderTypes = (moduleName) => {
      if (getTypesByPackage(moduleName).length) {
        return (
          <div class="pack-list__entities">
            <RouterLink to={{
              name: 'package.typedefs',
              params: { package: moduleName }
            }}>
              Types
            </RouterLink>
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

    const pc = () => packages.map((pkg) => (
      <VListItem>{pkg.name}</VListItem>
    ));

    return () => (
      <VList nav density="compact">
        {pc()}
      </VList>
    )
  }
});
