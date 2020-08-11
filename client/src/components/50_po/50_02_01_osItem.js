import React, { useContext, Fragment } from 'react';
import PurContext from '../../context/pur/purContext';
import PopoverContext from '../../context/popover/popoverContext';

const OsItem = ({ osItem }) => {
  // const { downloadCase } = caseContext;
  const labelList = ['osNo'];
  const purContext = useContext(PurContext);
  const { switchPage, switchOsCurrent, deleteOs } = purContext;

  const popoverContext = useContext(PopoverContext);
  const { togglePopover } = popoverContext;

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

  const deleteBtn = (e) => {
    e.preventDefault();
    const osId = e.target.value;
    deleteOs(osId);
  };

  const deleteBtnPosition = {
    top: ' 70%',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };

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
      <button
        value={osItem._id}
        name='deleteOs'
        onClick={togglePopover}
        className='btn btn-fade btn-square'
        style={deleteBtnPosition}
      >
        x
      </button>
    </div>
  );
};

export default OsItem;
