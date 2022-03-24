import { defineStore } from 'pinia';
import packages from '../.docs/packages.json';
import jsdocs from '../.docs/jsdoc.json';
import components from '../.docs/components.json';
import { createNavElement } from '../utils/NavElemCreator';

export const usePackagesData = defineStore('packages', {
  state: () => ({
    packages,
    jsdocs,
    components
  }),
  getters: {
    getClasses(state) {
      return createNavElement(state, 'class');
    },
    getMethods(state) {
      return createNavElement(state, 'function');
    },
    getTypes(state) {
      return createNavElement(state, 'typedef');
    },
    getConstants(state) {
      return createNavElement(state, 'constant');
    },
    getComponents(state) {
      return createNavElement(state, 'component');
    }
  }
});
