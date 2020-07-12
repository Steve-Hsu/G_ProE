import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

// Components
import LeftBar from '../layout/LeftBar';
import QuoCaseSelector from '../../components/40_quo/40_01_quoCaseSelector';
import QuoFormSelector from '../../components/40_quo/40_02_quoFormSelector';
import SrMtrlForm from '../../components/30_srMtrl/30_01_srMtrlForm';
// quoForm

const Quotation = (props) => {
  // Context
  const quoContext = useContext(QuoContext);
  const { switchPage, quotateFor, isQuotating } = quoContext;
  const currentPath = props.location.pathname;

  const onClick = (e) => {
    e.preventDefault();
    switchPage(e.target.value);
  };
  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar currentPath={currentPath} />

      {/* Grid-2 */}
      {quotateFor === null ? (
        <div className='p-1 container container-with-navbar'>
          <button value='material' onClick={onClick}>
            Quotation for materials
          </button>
          <button value='garment' onClick={onClick}>
            Quotation for garments
          </button>
        </div>
      ) : quotateFor === 'material' ? (
        <div className='p-1 container container-with-navbar'>
          <button value={null} onClick={onClick}>
            go back
          </button>
          <SrMtrlForm currentPath={currentPath} />
        </div>
      ) : quotateFor === 'garment' ? (
        <div>
          {isQuotating === null ? (
            <div className='p-1 container container-with-navbar'>
              {' '}
              <button value={null} onClick={onClick}>
                go back
              </button>
              <QuoCaseSelector />
            </div>
          ) : (
            <QuoFormSelector />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Quotation;
