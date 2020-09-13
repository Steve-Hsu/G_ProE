import React, { useContext } from 'react';
import PurContext from '../../context/pur/purContext';

const CaseItem = ({ caseItem }) => {
  // const { downloadCase } = caseContext;
  const labelList = ['cNo', 'style', 'client', 'merchandiser'];
  const purContext = useContext(PurContext);
  const { selectedCases, selectCase } = purContext;

  const labelSwitcher = (label) => {
    switch (label) {
      case 'cNo':
        return 'Case No.';
      case 'caseType':
        return 'Type';
      case 'quoNo':
        return 'Quotation No.';
      default:
        return label.charAt(0).toUpperCase() + label.slice(1);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    const caseId = caseItem._id;
    selectCase(caseId);
  };

  const btnClickedStyle = (id) => {
    const haveSelectedTheCasae = selectedCases.includes(id);
    if (haveSelectedTheCasae) {
      return {
        color: 'white',
        background: 'var(--primary-color)',
        // transition: 'all 0.5s',
        border: '0',
        borderBottom: '1px solid var(--primary - color)',
      };
    } else {
      return {};
    }
  };

  return (
    <div
      id={caseItem._id}
      className='mb-1 p-1 card btn btn-dropdown lead'
      style={btnClickedStyle(caseItem._id)}
      onClick={onClick}
    >
      <div className='grid-4'>
        {labelList.map((label) => (
          <div key={`QuoListItem${label}${caseItem.cNo}`}>
            <div className='label'>{labelSwitcher(label)}</div>
            <div>{caseItem[label]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseItem;
