import { defineStore } from 'pinia';
import packages from '../.docs/packages.json';
import jsdocs from '../.docs/jsdoc.json';
import components from '../.docs/components.json';

export const usePackagesData = defineStore('packages', {
  state: () => ({
    packages: []
  }),
  actions: {
    fetchAndSetPackage() {
      this.packages = packages.map((elem) => ({
        moduleName: elem.name,
        moduleEntities: [
          {
            id: 'components',
            content: components.filter((component) => component.package === elem.name).map((el) => (
              {
                ...el,
                name: el.displayName
              }))
          },
          { id: 'classes', content: jsdocs.filter((doc) => doc.package === elem.name && doc.kind === 'class') },
          { id: 'methods', content: jsdocs.filter((doc) => doc.package === elem.name && doc.kind === 'function') },
          { id: 'typeDefs', content: jsdocs.filter((doc) => doc.package === elem.name && doc.kind === 'typedef') },
          { id: 'constants', content: jsdocs.filter((doc) => doc.package === elem.name && doc.kind === 'constant') }
        ].filter((el) => Object.values(el).some((val) => val.length > 0))
      }));
    }
  }
});
