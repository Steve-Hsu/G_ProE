import React, { useContext, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import CasesContext from '../../context/cases/casesContext';

// @ Components
import ColorWay from './1_1_ColorWay';
import Size from './1_2_Size';
import Qty from './1_3_Qty';
import Mtrl from './1_4_Mtrl';
import DeletePopover from '../20_cases/DeletePopover';

const CaseForm = () => {
  //@ Init Context
  const casesContext = useContext(CasesContext);
  //@ Destructure, pull out the variables form userContext
  const {
    style,
    client,
    formIsHalfFilledOut,
    cWays,
    sizes,
    gQtys,
    mtrls,
    addCaseValue,
    popover,
    current,
    uploadNewCase,
  } = casesContext;

  //@ Make a body to submit
  const cases = {
    style: style,
    client: client,
    cWays: cWays,
    sizes: sizes,
    gQtys: gQtys,
    mtrls: mtrls,
  };
  //@ Value for input
  //words length limit
  const maxWdsLength = '50';
  const styleLength = maxWdsLength;
  const clientLength = maxWdsLength;

  //@ Style for breakdown Table --------
  const SizesColumnSize = () => {
    if (sizes.length < 6) {
      return 5;
    } else {
      return sizes.length;
    }
  };
  const breakDownTable = {
    display: 'grid',
    gridTemplateColumns: `repeat(${SizesColumnSize()}, 1fr)`,
    gridGap: '0',
  };

  //@ OnChange functions ----------
  const onSubmitCase = (e) => {
    e.preventDefault();
    uploadNewCase(cases);
  };

  return (
    <Fragment>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      <Prompt when={formIsHalfFilledOut} message='Hey' />
      {popover ? <DeletePopover key={current.id} current={current} /> : null}
      <div className='p-1 container container-with-navbar'>
        <div>
          <form id='caseForm' onSubmit={onSubmitCase}>
            <div>
              <input
                id='caseStyle'
                type='text'
                name='style'
                onChange={addCaseValue}
                maxLength={styleLength}
                placeholder='.'
                className='MPH-input'
                value={style || ''}
              />
              <label htmlFor='caseStyle' className='MPH-input-label'>
                Style
              </label>

              <input
                id='caseClient'
                type='text'
                name='client'
                onChange={addCaseValue}
                maxLength={clientLength}
                placeholder='.'
                className='MPH-input'
                value={client || ''}
              />
              <label htmlFor='caseClient' className='MPH-input-label'>
                Client
              </label>
            </div>

            {/* CS-Breakdown table */}
            {/* Color -------------------------- */}
            <div>Color-Size-Breakdown</div>
            <div className='grid-1-6-1'>
              <div></div>
              <div style={breakDownTable}>
                {sizes.map((size) => (
                  <Size key={size.id} size={size} />
                ))}
              </div>
              <div className='lead text-primary'>SubTotal</div>
            </div>
            <div className='grid-1-6-1'>
              <div>
                {cWays.map((cWay) => (
                  <ColorWay key={cWay.id} cWay={cWay} />
                ))}
              </div>
              <div style={breakDownTable}>
                {sizes.map((size) => (
                  <div key={`Qty${size.id}`}>
                    {gQtys.map((gQty) => (
                      <Qty key={gQty.id} size={size} gQty={gQty} />
                    ))}
                  </div>
                ))}
              </div>
              <div>
                {cWays.map((cWay) => {
                  let subtotal = 0;
                  gQtys.map((gQty) => {
                    if (gQty.cWay === cWay.id) {
                      subtotal = subtotal + Number(gQty.gQty);
                    }
                    return subtotal;
                  });
                  return (
                    <div
                      style={{ height: '68px' }}
                      key={`subtotalOf${cWay.id}`}
                    >
                      <div className='tiny text-primary'>{cWay.gClr}</div>
                      <div className='lead'>{subtotal}</div>
                    </div>
                  );
                })}
                <div className='lead text-primary'>Total Qantity</div>
                <div className='large'>
                  {gQtys.reduce(
                    (partial_sum, gQty) => partial_sum + Number(gQty.gQty),
                    0
                  )}
                </div>
              </div>
            </div>
            <br />

            {/* Material -------------------------- */}
            <div>
              Materials<br></br>
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
