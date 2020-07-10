import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

const QuoList = ({ listItem }) => {
  const quoContext = useContext(QuoContext);
  const { isQuotating, switchQuoForm, downLoadQuoForm } = quoContext;
  const labelList = [
    'cNo',
    'caseType',
    'style',
    'client',
    'merchandiser',
    'quoNo',
  ];

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

    let check = switchQuoForm(listItem.cNo);
    // setTimeout(() => {
    console.log('yes I should download', check);
    downLoadQuoForm(check);
    // }, 300);

    console.log('Yes You hit me');
  };
  return (
    <button onClick={onClick} key={`QuoListItemBtn$${listItem.cNo}`}>
      <div className='mb-1 p-1 card'>
        <div className='grid-6'>
          {labelList.map((label) => (
            <div key={`QuoListItem${label}${listItem.cNo}`}>
              <div className='label'>{labelSwitcher(label)}</div>
              <div>{listItem[label]}</div>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
};

export default QuoList;
