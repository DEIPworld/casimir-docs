import { defineComponent } from 'vue';

import {
  VList,
  VListItem, VListItemTitle,
  VListSubheader,
} from 'vuetify/components';
import { usePackagesData, xxx } from '@/stores/packages';

export const PackagesNavigation = defineComponent({
  setup() {
    const {
      packagesTypes,
      getPackagesByType
    } = xxx();

    const renderPackages = (type: string) => {
      const pkgs = getPackagesByType(type);

      if (pkgs.length) {
        return pkgs.map((pkg) => (
          <VListItem to={{ name: 'package.details', params: { package: pkg.urlName } }}>
            <VListItemTitle>
              {pkg.displayName}
            </VListItemTitle>
          </VListItem>
        ))
      }

      return null;

    }

    const renderSection = (type: string) => {
      const packages = renderPackages(type);

      if (packages) {
        return (
          <div class="mb-6">
            <VListSubheader>{type}</VListSubheader>
            {packages}
          </div>
        )
      }

      return null;
    }

    const renderSections = () => packagesTypes
      .map(
        (type) => renderSection(type)
      )

    return () => (
      <VList nav density="compact">
        {renderSections()}
      </VList>
    )
  }
})
