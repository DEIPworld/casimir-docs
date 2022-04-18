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
    // TODO: remove postfixes 'ByPackage'
    getClassesByPackage: (state) => (pack) => collectionList(state.jsdocs, { package: pack, kind: 'class' }),
    getMethodsByPackage: (state) => (pack) => collectionList(state.jsdocs, { package: pack, kind: 'function' }),
    getTypesByPackage: (state) => (pack) => collectionList(state.jsdocs, { package: pack, kind: 'typedef' }),
    getConstantsByPackage: (state) => (pack) => collectionList(state.jsdocs, { package: pack, kind: 'constant' }),
    getComponentsByPackage: (state) => (pack) => (
      collectionList(state.components, { package: pack })
    ),
    // TODO: remove all duplicated methods, remove postfixes 'Data' like in 'getType' getter
    getMembersByClassName: (state) => (params) => collectionList(state.jsdocs, params),
    getMethodsWithError: (state) => (pack) => collectionList(state.jsdocs, { package: pack }).filter((elem) => (!elem.memberof) && elem.kind === 'function'),
    getInstanceByModuleName: (state) => (pack) => collectionList(state.jsdocs, { package: pack }),
    getMethodsByMemberOf: (state) => (memberof) => collectionList(state.jsdocs, { memberof, kind: 'function' }),
    getClassData: (state) => (params) => collectionOne(state.jsdocs, params),
    getComponentData: (state) => (params) => collectionOne(state.components, params),
    getConstantsData: (state) => (params) => collectionOne(state.jsdocs, params),
    getType: (state) => (name) => collectionList(state.jsdocs, { kind: 'typedef', name }),
    getExamples: (state) => () => collectionList(state.jsdocs, 'example')
  }
});
