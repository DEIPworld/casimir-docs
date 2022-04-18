export const DisplayMember = {
  name: 'DisplayMember',
  props: {
    member: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const renderMembersList = () => {
      if (props.member) {
        return (
        <div>
          <h3>{props.member.name}</h3>
          <h4>memberof: </h4>
          <div>{props.member.memberof}</div>
        </div>
        );
      }
      return null;
    };

    return () => (
    <div>
      { renderMembersList()}
    </div>
    );
  }
};
