import { defineStore } from 'pinia';
import { collectionList } from '@deip/toolbox';
import packages from '../.docs/packages.json';
import jsdocs from '../.docs/jsdoc.json';
import components from '../.docs/components.json';

export const usePackagesData = defineStore('packages', {
  state: () => ({
    packages,
    jsdocs,
    components
  }),
  getters: {
    getClassesByPackage: () => (pack) => collectionList(jsdocs, { package: pack, kind: 'class' }),
    getMethodsByPackage: () => (pack) => collectionList(jsdocs, { package: pack, kind: 'function' }),
    getTypesByPackage: () => (pack) => collectionList(jsdocs, { package: pack, kind: 'typedef' }),
    getConstantsByPackage: () => (pack) => collectionList(jsdocs, { package: pack, kind: 'constant' }),
    getComponentsByPackage: () => (pack) => collectionList(components, { package: pack })
  }
});
