import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

const QuoMtrl = ({ mtrl }) => {
  const quoContext = useContext(QuoContext);

  const { isQuotating, switchQuoFormSelector, downLoadQuoForm } = quoContext;

  return (
    <div className='mb-1 p-1 card'>
      <div className='grid-6'>
        {mtrl.item}
        {/* {mtrl.map((label) => (
            <div key={`QuoListItem${label}${listItem.cNo}`}>
              <div className='label'>{labelSwitcher(label)}</div>
              <div>{listItem[label]}</div>
            </div>
          ))} */}
      </div>
    </div>
  );
};

export default QuoMtrl;
