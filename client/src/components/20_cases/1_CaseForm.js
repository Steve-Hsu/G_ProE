import React, { useContext, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CasesContext from '../../context/cases/casesContext';

// Components
import ColorWay from './1_1_ColorWay';
import Size from './1_2_Size';
import Qty from './1_3_Qty';
import Mtrl from './1_4_Mtrl';
import DeletePopover from '../20_cases/DeletePopover';

const CaseForm = () => {
  //Init Context
  const casesContext = useContext(CasesContext);
  //Destructure, pull out the variables form userContext
  const {
    user,
    company,
    style,
    client,
    formIsHalfFilledOut,
    cWays,
    sizes,
    gQtys,
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
    uploadNewCase,
  } = casesContext;

  //Make a body to submit
  const cases = {
    style: style,
    client: client,
    cWays: cWays,
    sizes: sizes,
    gQtys: gQtys,
    mtrls: mtrls,
  };

  //Style for breakdown Table --------

  const colorWayColumnSize = () => {
    if (cWays.length < 6) {
      return 5;
    } else {
      return cWays.length;
    }
  };
  const breakDownTable = {
    display: 'grid',
    gridTemplateColumns: `repeat(${colorWayColumnSize()}, 1fr)`,
    gridGap: '0',
  };

  //OnChange functions ----------
  const onSubmitCase = (e) => {
    e.preventDefault();
    uploadNewCase(cases);
  };

  return (
    <Fragment>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      <Prompt when={formIsHalfFilledOut} message='Hey' />
      {popover ? <DeletePopover key={current.id} current={current} /> : null}
      <div className='p-1 test-2'>
        <div>
          <form onSubmit={onSubmitCase}>
            {'Import style from Excel'}
            <input type='text' name='import' id='imoprt' />
            {'Submit'}
            <input type='submit' className='btn btn-primary btn-block' />
            {'Style'}
            <input type='text' name='style' onChange={addCaseValue} />
            {'Client'}
            <input type='text' name='client' onChange={addCaseValue} />
            {/* CS-Breakdown btns-------------------------- */}
            <div>
              {'Color Way'}
              <button
                name='cWayBtn'
                className='btn btn-sm btn-primary btn-rounded-square'
                onClick={addcWay}
              >
                +
              </button>
              {'    '}
              {'Size'}
              <button
                name='sizeBtn'
                className='btn btn-sm btn-primary'
                onClick={addSize}
              >
                +
              </button>
            </div>
            {/* CS-Breakdown table */}
            {/* Color -------------------------- */}

            <div className='grid-1-7'>
              <div></div>
              <div style={breakDownTable} className='grid-5'>
                {cWays.map((cWay) => (
                  <ColorWay key={cWay.id} cWay={cWay} />
                ))}
              </div>
            </div>
            <div className='grid-1-7'>
              {/* Size -------------------------- */}
              <div>
                {sizes.map((size) => (
                  <Size key={size.id} size={size} />
                ))}
              </div>
              <div style={breakDownTable} className='grid-5'>
                {cWays.map((cWay) => (
                  <div key={`Qty${cWay.id}`}>
                    {gQtys.map((gQty) => (
                      <Qty key={gQty.id} cWay={cWay} gQty={gQty} />
                    ))}
                  </div>
                ))}
              </div>
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
