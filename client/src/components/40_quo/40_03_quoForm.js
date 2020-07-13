import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import CaseContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';
import DeletePopover from '../layout/DeletePopover';

const QuoForm = () => {
  const quoContext = useContext(QuoContext);
  const caseContext = useContext(CaseContext);
  const popoverContext = useContext(PopoverContext);
  const { switchQuoForm, downLoadQuoForm } = quoContext;
  const {
    cNo,
    caseType,
    style,
    client,
    cWays,
    sizes,
    gQtys,
    mtrls,
    defaultCase,
  } = caseContext;
  const { popover, current } = popoverContext;
  const onSubmitQuoForm = () => {};

  const onClick = (e) => {
    e.preventDefault();
    switchQuoForm(null);
    downLoadQuoForm(null);
    defaultCase();
  };

  return (
    <Fragment>
      <div className='p-1 container container-with-navbar'>
        <button onClick={onClick}>Yes</button>{' '}
        <form id='quoForm' onSubmit={onSubmitQuoForm}>
          <div>{cNo}</div>
          <div>{caseType}</div>
          <div>{style}</div>
          <div>{client}</div>
          <div>Color Ways : Total {cWays.length} Color Ways</div>
          {cWays.map((cWay) => {
            return <span key={cWay.id}>{cWay.gClr}, </span>;
          })}
          <div>Sizes : Total {sizes.length} sizes</div>
          {sizes.map((size) => {
            return <span key={size.id}>{size.gSize}</span>;
          })}
        </form>
      </div>
    </Fragment>
  );
};

export default QuoForm;
