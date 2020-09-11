import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import PopoverContext from '../../context/popover/popoverContext';

// Components
import LeftBar from '../layout/LeftBar';
// import QuoCaseSelector from '../../components/40_quo/40_01_quoCaseSelector';
import QuoFormSelector from '../../components/40_quo/40_02_quoFormSelector';
import QuoForm from '../../components/40_quo/40_03_quoForm';
// import SrMtrl from '../../components/30_srMtrl/30_01_srMtrl';
import ItemSelector from '../itemSelector/ItemSelector';
import DeletePopover from '../../components/layout/DeletePopover';
import GoBackBtn from '../elements/btns/GoBackBtn';
// quoForm

const Quotation = (props) => {
  // Context
  const quoContext = useContext(QuoContext);
  const popoverContext = useContext(PopoverContext);
  const {
    switchPage,
    quotateFor,
    isQuotating,
    openQuoForm,
    // getCaseList,
  } = quoContext;
  const { popover, current } = popoverContext;
  const currentPath = props.location.pathname;

  const onClick = (e) => {
    e.preventDefault();
    switchPage(e.target.value);
    // if (e.target.value === 'garment') {
    //   getCaseList();
    // }
  };
  return (
    <Fragment>
      {/* {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      {popover ? <DeletePopover key={current._id} current={current} /> : null}
      <div className='grid-1-4'>
        {/* Grid-1 */}
        <LeftBar currentPath={currentPath} />

        {/* Grid-2 */}
        {quotateFor === null ? (
          <div className=' container container-with-navbar'>
            <GoBackBtn
              onClick={() => {
                props.history.push('/api/case/director');
              }}
            />
            <button value='material' onClick={onClick}>
              Quotation for materials
            </button>
            <button value='garment' onClick={onClick}>
              Quotation for garments
            </button>
          </div>
        ) : quotateFor === 'material' ? (
          <ItemSelector purpose='quoSrMtrlSelector' currentPath={currentPath} />
        ) : quotateFor === 'garment' ? (
          <div>
            {isQuotating === null ? (
              <ItemSelector props={props} purpose='quoCaseSelector' />
            ) : (
              <div>
                {openQuoForm === null ? <QuoFormSelector /> : <QuoForm />}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Quotation;
