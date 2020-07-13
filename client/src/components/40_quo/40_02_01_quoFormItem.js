import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';
import CaseContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';

const QuoFormItem = ({ quoForm }) => {
  const quoContext = useContext(QuoContext);
  const caseContext = useContext(CaseContext);
  const popoverContext = useContext(PopoverContext);
  const { isQuotating, switchQuoFormSelector, downLoadQuoForm } = quoContext;
  const { downloadCase } = caseContext;
  const { togglePopover } = popoverContext;
  const labelList = ['quoNo'];

  const labelSwitcher = (label) => {
    switch (label) {
      case 'quoNo':
        return 'Quotation No.';
      default:
        return label.charAt(0).toUpperCase() + label.slice(1);
    }
  };

  const onClick = (e) => {
    e.preventDefault();

    // let check = switchQuoFormSelector(cNo);
    // setTimeout(() => {
    // console.log('yes I should download', check);
    // downLoadQuoForm(check);
    // downloadCase(listItem._id);
  };

  //For sparete the postion of btn, here use an inline style.
  //deleteBtn in mtrl.
  const deleteBtnPosition = {
    top: ' 70%',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };

  return (
    <div
      onClick={onClick}
      key={`QuoFormItemBtn$${quoForm.quoNo}`}
      className='btn'
    >
      <div className='mb-1 p-1 card'>
        <div className='grid-6'>
          {labelList.map((label) => (
            <div key={`QuoFormItem${label}${quoForm.quoNo}`}>
              <div className='label'>{labelSwitcher(label)}</div>
              <div>{quoForm[label]}</div>
            </div>
          ))}
          <div>
            <button
              value={quoForm.id}
              name='quoForm'
              onClick={togglePopover}
              className='btn btn-fade btn-square'
              style={deleteBtnPosition}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoFormItem;
