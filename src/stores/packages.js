import { defineStore } from 'pinia';
import { collectionList, collectionOne } from '@deip/toolbox';
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
    getClassesByPackage: (state) => (pack) => collectionList(state.jsdocs, { package: pack, kind: 'class' }),
    getMethodsByPackage: (state) => (pack) => collectionList(state.jsdocs, { package: pack, kind: 'function' }),
    getTypesByPackage: (state) => (pack) => collectionList(state.jsdocs, { package: pack, kind: 'typedef' }),
    getConstantsByPackage: (state) => (pack) => collectionList(state.jsdocs, { package: pack, kind: 'constant' }),
    getComponentsByPackage: (state) => (pack) => (
      collectionList(state.components, { package: pack })
    ),
    getClassData: (state) => (params) => collectionOne(state.jsdocs, params),
    getComponentData: (state) => (params) => collectionOne(state.components, params)
  }
});
