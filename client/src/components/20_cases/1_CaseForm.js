import React, { useContext, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CasesContext from '../../context/cases/casesContext';

// Components
import ColorWay from './1_1_ColorWay';
import Size from './1_2_Size';
import Mtrl from './1_3_Mtrl';
import DeletePopover from '../20_cases/DeletePopover';

const CaseForm = () => {
  //Init Context
  const casesContext = useContext(CasesContext);
  //Destructure, pull out the variables form userContext
  const {
    style,
    client,
    cWays,
    sizes,
    mtrls,
    addCaseValue,
    addSize,
    deleteSize,
    addcWay,
    updatecWay,
    deletecWay,
    addMtrl,
    deleteMtrl,
    expandMtrlColor,
    popover,
    current,
  } = casesContext;

  return (
    <Fragment>
      {popover ? <DeletePopover key={current.id} current={current} /> : null}
      <div className='p-1 test-2'>
        <div>
          <form>
            {'Import style from Excel'}
            <input type='text' name='import' id='imoprt' />
            {'Style'}
            <input type='text' name='style' onChange={addCaseValue} />
            {'Client'}
            <input type='text' name='client' onChange={addCaseValue} />
            {/* ColorWay -------------------------- */}
            <div>
              {'Color Way'}
              <button
                name='cWayBtn'
                className='btn btn-sm btn-primary btn-rounded-square'
                onClick={addcWay}
              >
                +
              </button>
            </div>
            <div className='grid-5'>
              {cWays.map((cWay) => (
                <ColorWay key={cWay.id} cWay={cWay} />
              ))}
            </div>

            {/* Size -------------------------- */}
            <div>
              {'Size'}
              <button
                name='sizeBtn'
                className='btn btn-sm btn-primary'
                onClick={addSize}
              >
                +
              </button>
            </div>
            <div className='grid-5'>
              {sizes.map((size) => (
                <Size key={size.id} size={size} />
              ))}
            </div>

            {/* Material -------------------------- */}
            <div>
              {'Material'}
              <button
                name='mtrlBtn'
                className='btn btn-sm btn-primary'
                onClick={addMtrl}
              >
                +
              </button>
            </div>
            <div>
              {mtrls.map((mtrl) => (
                <Mtrl key={mtrl.id} mtrl={mtrl} />
              ))}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CaseForm;
