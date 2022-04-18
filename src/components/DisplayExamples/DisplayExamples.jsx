import { usePackagesData } from '@/stores/packages';

export const DisplayExamples = {
  name: 'DisplayExamples',
  setup() {
    const { getExamples } = usePackagesData();

    const renderList = () => getExamples.map((elem) => (<div>{elem}</div>));

    return () => (
    <div>
      { renderList() }
    </div>
    );
  }
};
