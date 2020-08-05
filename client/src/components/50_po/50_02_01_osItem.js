import React, { useContext, Fragment } from 'react';
import PurContext from '../../context/pur/purContext';

const OsItem = ({ osItem }) => {
  // const { downloadCase } = caseContext;
  const labelList = ['osNo'];
  const purContext = useContext(PurContext);
  const { selectedCases, selectCase, switchPage, switchOsCurrent } = purContext;

  const labelSwitcher = (label) => {
    switch (label) {
      case 'osNo':
        return 'Order Summary No.';
      default:
        return label.charAt(0).toUpperCase() + label.slice(1);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    // console.log(e);
    switchPage(e.target.value);
    switchOsCurrent(osItem);
  };

  //   const btnClickedStyle = (id) => {
  //     const haveSelectedTheCasae = selectedCases.includes(id);
  //     if (haveSelectedTheCasae) {
  //       return {
  //         color: 'white',
  //         background: 'var(--primary-color)',
  //         // transition: 'all 0.5s',
  //         border: '0',
  //         borderBottom: '1px solid var(--primary - color)',
  //       };
  //     } else {
  //       return {};
  //     }
  //   };

  return (
    <div className='grid-4 card'>
      {labelList.map((label) => (
        <div key={`OsItem${label}${osItem.osNo}`}>
          <div className='label'>{labelSwitcher(label)}</div>
          <div>{osItem[label]}</div>
        </div>
      ))}
      <button value='orderSummary' onClick={onClick}>
        Check
      </button>
    </div>
  );
};

export default OsItem;
