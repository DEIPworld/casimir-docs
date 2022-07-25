import { defineStore } from 'pinia';
import rawPackages from '../.docs/packages.json';
import rawJsDocs from '../.docs/jsdoc.json';
import rawComponents from '../.docs/components.json';

import where from 'filter-where';

import {
  paramCase,
  sentenceCase,
} from "change-case";

import { computed, reactive } from 'vue';

type Package = { name: string, type: string, description: string };
type ExtendedPackage = { displayName: string, urlName: string } & Package;


export const xxx = defineStore('docs', () => {
  const _rawPackages: Package[] = reactive(rawPackages);

  const packages = computed<ExtendedPackage[]>(() => _rawPackages.map((pkg) => {
    const noScopeName = pkg.name.split('/')[1];

    const displayName = sentenceCase(noScopeName);
    const urlName = noScopeName;

    return {
      ...pkg,
      displayName,
      urlName
    }
  }));

  const packagesTypes = computed(() => {
    const all = _rawPackages.map((pkg) => sentenceCase(pkg.type))
    return [...new Set(all)];
  })

  const getPackagesByType = (type: string): ExtendedPackage[] => packages.value
    .filter(where({ type: paramCase(type) }))

  const getPackageByUrlName = (urlName: string): ExtendedPackage | undefined => packages.value
    .find(where({ urlName }))

  return {
    packages,
    packagesTypes,
    getPackagesByType,
    getPackageByUrlName
  }
})


// //////////////////////////////////////


const collectionOne = (collection, query) => collection.find(where(query));
const collectionList = (collection, query) => collection.filter(where(query));

export const usePackagesData = defineStore('packages', {
  state: () => ({
    packages: rawPackages,
    jsdocs: rawJsDocs,
    components: rawComponents
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
