import React, { useContext, Fragment, useEffect } from 'react';
import { Prompt } from 'react-router-dom';
import CasesContext from '../../context/cases/casesContext';
import AuthUserContext from '../../context/authUser/authUserContext';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import PopoverContext from '../../context/popover/popoverContext';

// @ Components
import ColorWay from './1_1_ColorWay';
import Size from './1_2_Size';
import Qty from './1_3_Qty';
import MtrlTable from './1_4_MtrlTable';
import MtrlBoard from './1_5_MtrlBoard';
import DeletePopover from '../layout/DeletePopover';

const CaseForm = () => {
  //@ Init Context
  const casesContext = useContext(CasesContext);
  const authUserContext = useContext(AuthUserContext);
  const srMtrlContext = useContext(SrMtrlContext);
  const popoverContext = useContext(PopoverContext);

  //@ Destructure, pull out the variables form userContext
  const {
    _id, // this id will appear after download an valid case
    cNo,
    caseType,
    style,
    client,
    formIsHalfFilledOut,
    cWays,
    sizes,
    gQtys,
    mtrls,
    addCaseValue,
    uploadNewCase,
    uploadCase,
    error,
    isBoardMode,
  } = casesContext;
  const { comName, comSymbol } = authUserContext;
  const { updateSrMtrlByMtrl } = srMtrlContext;
  const { popover, current } = popoverContext;

  //@ Make a body to submit
  const cases = {
    caseType: caseType,
    style: style,
    client: client,
    cWays: cWays,
    sizes: sizes,
    gQtys: gQtys,
    mtrls: mtrls,
  };

  //@ Case Types, the type has nothing to do with code's "type"
  const caseTypeList = ['', 'Test Sample', 'Salesman Sample', 'Bulk'];

  //@ Value for input
  //words length limit
  const maxWdsLength = '50';
  const styleLength = maxWdsLength;
  const clientLength = maxWdsLength;

  useEffect(() => {
    if (caseType === null) {
    } else {
      loadCaseSelectCaseTypeTagIndex(caseType);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseType]);

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
  const onSubmitCase = async (e) => {
    e.preventDefault();
    let updatedCases = {};
    if (cNo === null) {
      // update the state of mPrice
      console.log('uploadNewCase is called'); // Test Code
      updatedCases = await uploadNewCase(cases);
    } else {
      //Delete the refs of srMtrls from database, that deleted in UI by user
      updatedCases = await uploadCase(cases, _id);
    }

    // If error is null it will be false, else it will be true. null equals false
    if (error) {
      // If error contains some message, do not generate srMtrl.
    } else {
      const body = {
        cases: updatedCases,
        comName: comName,
        comSymbol: comSymbol,
      };
      // If no error then generate srMtrl
      updateSrMtrlByMtrl(body);
    }
  };

  const loadCaseSelectCaseTypeTagIndex = (type) => {
    document
      .getElementById(`${type}-caseType`)
      .setAttribute('selected', 'selected');
  };

  const onChange = (e) => {
    addCaseValue(e);
  };

  return (
    <Fragment>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      <Prompt when={formIsHalfFilledOut} message='Hey' />
      {popover ? <DeletePopover key={current.id} current={current} /> : null}
      <div className='p-1 container container-with-navbar'>
        <div>
          <form id='caseForm' onSubmit={onSubmitCase}>
            {/* Case Information */}
            <div className='lead'>Case Information</div>
            <div className='grid-1-5 row-gap-md round-card bg-white mb-2'>
              <div className='v-center-content'>CaseNo.</div>
              <div>{cNo === null ? 'New Case' : cNo}</div>

              <div className='v-center-content'>Style</div>
              <input
                id='caseStyle'
                type='text'
                name='style'
                onChange={addCaseValue}
                maxLength={styleLength}
                placeholder='Enter the name of style'
                // className='MPH-input'
                value={style || ''}
                required
              />

              <div className='v-center-content'>Client</div>
              <input
                id='caseClient'
                type='text'
                name='client'
                onChange={addCaseValue}
                maxLength={clientLength}
                placeholder='.'
                // className='MPH-input'
                value={client || ''}
                required
              />

              <div className='v-center-content'>Case Type</div>
              <select
                id='caseType'
                name='caseType'
                list='caseTypeList'
                onChange={addCaseValue}
                className='select-primary'
                required
              >
                {caseTypeList.map((t) => {
                  return (
                    <option
                      key={`${t}-caseType`}
                      id={`${t}-caseType`}
                      value={t}
                    >
                      {t}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* CS-Breakdown table */}
            {/* Color -------------------------- */}
            <div className='lead'>Color-Size-Breakdown</div>
            <div className='row-gap-md round-card bg-white mb-2'>
              <div className='grid-1-6-1 mb-2'>
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
            </div>

            {/* Material -------------------------- */}
            <div className='grid-6'>
              <div className='lead'>
                Materials<br></br>
              </div>
              <div className='sq-toggleSwitch '>
                <label className='sq-switch'>
                  <input
                    className='sq-switchInput'
                    name='isBoardMode'
                    type='checkbox'
                    checked={isBoardMode == true}
                    onChange={onChange}
                  />
                  <div className='sq-slider h-scatter-content v-center-content'>
                    <div className='sq-block center-content '>
                      <i class='fas fa-list-ul'> Table</i>
                    </div>
                    <div className='sq-block center-content '>
                      <i class='fas fa-table'> Board</i>
                    </div>
                  </div>
                </label>
                <span></span>
              </div>
            </div>

            <div>
              {isBoardMode === true ? (
                <div className='flexBox'>
                  {mtrls.map((mtrl) => (
                    <MtrlBoard key={mtrl.id} mtrl={mtrl} />
                  ))}
                </div>
              ) : (
                <div>
                  {mtrls.map((mtrl) => (
                    <MtrlTable key={mtrl.id} mtrl={mtrl} />
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CaseForm;
