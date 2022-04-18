import { usePackagesData } from '@/stores/packages';
import { watch } from 'vue';

import { DisplayParams } from '@/components/DisplayParams';
import { DisplayMethod } from '@/components/DisplayMethod';
import { DisplayMember } from '@/components/DisplayMember';

export const DisplayClass = {
  name: 'DisplayClass',
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const { getClassData, getMethodsByMemberOf, getMembersByClassName } = usePackagesData();

    let content = getClassData({ name: props.params.class });
    let descendantMethods = getMethodsByMemberOf(content.longname);

    let descendantMembers = getMembersByClassName(
      { name: props.params.package, class: props.params.class, kind: 'member' }
    );

    watch(props, () => {
      content = getClassData({ name: props.params.class });
      if (content) {
        descendantMethods = getMethodsByMemberOf(content.longname);
        descendantMembers = getMembersByClassName(
          { memberof: content.longname, kind: 'member' }
        );
      }
    });
    const renderTables = (tableData) => {
      if (tableData) {
        return (
        <div >
          <DisplayParams
            params={tableData}
            title="Params"
            titleSize="3"
          />
          <hr/>
        </div>
        );
      }
      return null;
    };

    const renderAugments = (augmentList) => {
      if (augmentList) {
        return (
        <div>
          <h2>Augments:</h2>
          <ul>
            { augmentList.map((elem) => <li>{elem}</li>)}
          </ul>
          <hr/>
        </div>
        );
      }
      return null;
    };

    const renderScopeOf = (scopeof) => {
      if (scopeof) {
        return <div>
          <h4>Scope: { scopeof }</h4>
          <hr/>
        </div>;
      }
      return null;
    };

    const renderMemberOf = (memberof) => {
      if (memberof) {
        return <div>
          <h4>Member of: { memberof }</h4>
          <hr/>
        </div>;
      }
      return null;
    };

    const renderListItem = (list) => list.map((item) => {
      if (item.name) {
        return <DisplayMethod method={item}/>;
      }
      return null;
    });

    const renderMethodsList = () => {
      if (descendantMethods.length) {
        return (
        <div>
          <h2>Class Methods:</h2>
          <div>
            {renderListItem(descendantMethods)}
          </div>
        </div>
        );
      }
      return null;
    };

    const renderMembersList = () => {
      if (descendantMembers.length) {
        return descendantMembers.map((elem) => (
        <div>
          <h2>Class Members:</h2>
          <div>
            <DisplayMember member={elem} />
          </div>
        </div>
        ));
      }
      return null;
    };

    const renderClassContent = () => (
      <div>
        <h3 class="feature-type">
          {content.kind}
        </h3>
        <hr/>
        <h1>{content.name}</h1>
        <hr/>
        <h3>{content.classdesc}</h3>
        { renderScopeOf(content.scope) }
        { renderMemberOf(content.memberof) }
        { renderTables(content.params) }
        { renderAugments(content.augments) }
        <h2>{ content.package }</h2>
        { renderMethodsList() }
        { renderMembersList() }
      </div>
    );

    return () => (
      renderClassContent()
    );
  }
};
