import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';
import CaseContext from '../../context/cases/casesContext';

const QuoForm = () => {
  const quoContext = useContext(QuoContext);
  const caseContext = useContext(CaseContext);
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
  const onSubmitQuoForm = () => {};

  const onClick = (e) => {
    e.preventDefault();
    switchQuoForm(null);
    downLoadQuoForm(null);
    defaultCase();
  };

  return (
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
  );
};

export default QuoForm;
