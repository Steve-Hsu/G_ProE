import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

// Components
import LeftBar from '../layout/LeftBar';
import QuoCaseSelector from '../../components/40_quo/40_01_quoCaseSelector';
import QuoForm from '../../components/40_quo/40_02_quoForm';
// quoForm

const Quotation = (props) => {
  // Context
  const quoContext = useContext(QuoContext);
  const { caseList, isQuotating, switchQuoForm, getCaseList } = quoContext;
  const currentPath = props.location.pathname;

  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar currentPath={currentPath} />

      {/* Grid-2 */}

      {isQuotating === null ? <QuoCaseSelector /> : <QuoForm />}
    </div>
  );
};

export default Quotation;
