const computeRouteName = (kind = 'component') => `package.${kind}`;

export const createNavElement = (state, id) => {
  let content;
  let setCondition;
  if (id !== 'component') {
    content = state.jsdocs;
    setCondition = (doc, elem) => (doc.package === elem.name && doc.kind === id);
  } else {
    content = state.components;
    setCondition = (doc, elem) => (doc.package === elem.name);
  }
  if (id !== 'typedef' && id !== 'function' && id !== 'constant') {
    return state.packages.map((elem) => ({
      id,
      moduleName: elem.name,
      content: content.filter((doc) => setCondition(doc, elem)).map(
        (el) => ({
          el,
          routeData: {
            name: computeRouteName(el.kind),
            params: {
              [id]: el.name || el.displayName || 'functionName',
              package: el.package.substring(6)
            }
          }
        })
      )
    }));
  }
  return state.packages.map((elem) => ({
    id,
    moduleName: elem.name,
    content: content.filter((doc) => setCondition(doc, elem)),
    routeData: {
      name: `package.${id}s`,
      params: {
        package: `${elem.name.substring(6)}-${id}s`
      }
    }
  }));
};
