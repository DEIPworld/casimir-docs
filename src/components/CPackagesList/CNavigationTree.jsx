export const CNavigationTree = {
  name: 'CNavigationTree',
  props: {
    packages: {
      type: Array
    }
  },
  setup(props) {
    const showSubItem = (subitem) => subitem.map((el) => <li>{el.name}</li>);
    const showListItem = (items) => items.map((item) => <div class="pack-list__entities__item">
         <div>{item.id.toUpperCase()}</div>
         <li class="pack-list__entities-item__content">{showSubItem(item.content)}</li>
      </div>);
    const showList = () => props.packages.map((pack) => <ul class="pack-list">
          <div class="pack-list__name">{pack.moduleName}</div>
        <ul class="pack-list__entities">{showListItem(pack.moduleEntities)}</ul>
      </ul>);
    return () => (
      showList()
    );
  }
};
