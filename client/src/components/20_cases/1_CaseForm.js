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
// import MtrlTable from './1_4_MtrlTable';
import MtrlBoard from './1_5_MtrlBoard';
import DeletePopover from '../layout/DeletePopover';
import SqBtnLarge from '../elements/btns/SqBtnLarge';
import Board from '../elements/board/Board';
import Table from '../elements/table/Table';

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
    isImportedExcel,
    addCaseValue,
    uploadCase,
    error,
    isBoardMode,
    displayTitles,
    addSize,
    addcWay,
    addMtrl,
    addMtrlValue,
  } = casesContext;
  const { comName, comSymbol } = authUserContext;
  const { updateSrMtrlByMtrl } = srMtrlContext;
  const { popover, current } = popoverContext;

  //@ Make a body to submit
  const cases = {
    cNo: cNo,
    caseType: caseType,
    style: style,
    client: client,
    cWays: cWays,
    sizes: sizes,
    gQtys: gQtys,
    mtrls: mtrls,
    isImportedExcel: isImportedExcel,
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

  //@ Style for toggleTitle btn --------
  const titleBtn = (subject) => {
    console.log('the subject', subject);
    if (subject) {
      if (Object.values(subject)[0] == true) {
        console.log('hhh');
        return {
          background: 'var(--cp-1_2)',
          color: 'var(--cp-1_3)',
        };
      }
    }
  };

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
      // console.log('uploadNewCase is called'); // Test Code
      updatedCases = await uploadCase(cases);
    } else {
      //Delete the refs of srMtrls from database, that deleted in UI by user
      updatedCases = await uploadCase(cases, _id);
    }
    // updatedCases = await uploadCase(cases, _id);

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

  return (
    <Fragment>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      <Prompt when={formIsHalfFilledOut} message='Hey' />
      {popover ? <DeletePopover key={current.id} current={current} /> : null}
      <div className='p-1 container container-with-navbar'>
        <div>
          <form id='caseForm' onSubmit={onSubmitCase}>
            {/* Case Information */}
            <div className='fs-lead'>Case Information</div>
            <div className='grid-1-5 row-gap-md round-card bg-cp-elem mb-3 bd-light'>
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
                className='bd-light'
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
                // placeholder='.'
                className='bd-light'
                value={client || ''}
                required
              />

              <div className='v-center-content'>Case Type</div>
              <select
                id='caseType'
                name='caseType'
                list='caseTypeList'
                onChange={addCaseValue}
                className='select-primary bd-light'
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
            <div className='grid-6 mb-1'>
              <div
                className='fs-lead v-center-content'
                style={{ gridColumn: '1/2' }}
              >
                Size-Breakdown
              </div>
              <SqBtnLarge
                label={<i className='fas fa-swatchbook'> Color ＋</i>}
                onClick={addcWay}
              />

              <SqBtnLarge
                label={<i className='fas fa-ruler'> Size ＋</i>}
                onClick={addSize}
              />

              <div className='flexBox' style={{ gridColumn: '5/7' }}>
                {/* <div className='lead text-primary'>Total Qty : </div>
                <div className='lead'>
                  {gQtys.reduce(
                    (partial_sum, gQty) => partial_sum + Number(gQty.gQty),
                    0
                  )}
                </div> */}
              </div>
            </div>

            <div className='row-gap-md round-card bg-cp-1 bd-light mb-3'>
              <div className='grid-1-07-6'>
                <div></div>
                <div></div>
                <div style={breakDownTable}>
                  {sizes.map((size) => (
                    <Size key={size.id} size={size} />
                  ))}
                </div>
              </div>
              <div className='grid-1-07-6 '>
                <div>
                  {cWays.map((cWay) => (
                    <ColorWay key={cWay.id} cWay={cWay} />
                  ))}
                </div>
                <div className='bd-cp-2-r-2px-dotted'>
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
                        key={`subtotalOf${cWay.id}`}
                        style={{
                          height: 'var(--btn-h-m)',
                        }}
                        className='mt-1 bd-cp-2-b-2px fs-tiny fc-cp-2-c'
                      >
                        <div
                          style={{ textAlign: 'right' }}
                          className='pr-1 pt-07'
                        >
                          {' '}
                          {subtotal.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={breakDownTable}>
                  {sizes.map((size) => (
                    <div key={`Qty${size.id}`} className='bd-cp-2-r-2px-dotted'>
                      {gQtys.map((gQty) => (
                        <Qty key={gQty.id} size={size} gQty={gQty} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Material -------------------------- */}
            <div className='grid-6'>
              {/* elem-1 */}
              <div className='fs-lead' style={{ gridColumn: '1/2' }}>
                Materials
                {/* <button className='btn btn-sq ml-1' onClick={addMtrl}>
                  <i className='fas fa-plus'></i>
                </button> */}
              </div>
              <div className='ml-05'>
                <SqBtnLarge
                  label={<i className='fab fa-buffer '> Item ＋</i>}
                  onClick={addMtrl}
                />
              </div>

              {/* elem-2 */}
              <div
                className='sq-toggleSwitch ml-1 '
                style={{ gridColumn: '3/4' }}
              >
                <label className='sq-switch'>
                  <input
                    className='sq-switchInput'
                    name='isBoardMode'
                    type='checkbox'
                    checked={isBoardMode == true}
                    onChange={addCaseValue}
                  />
                  <div className='sq-slider h-scatter-content v-center-content'>
                    <div className='sq-block center-content '>
                      <i className='fas fa-list-ul'> Table</i>
                    </div>
                    <div className='sq-block center-content '>
                      <i className='fas fa-table'> Board</i>
                    </div>
                  </div>
                </label>
              </div>
              {/* elem-3 */}
              <div
                className='grid-4 btn-toggleTitle-containter '
                style={{ gridColumn: '4 / 7' }}
              >
                {displayTitles.map((obj, idx) => {
                  return (
                    <button
                      id={Object.keys(obj)[0]}
                      name='displayTitles'
                      className='btn btn-sq btn-toggleTitle fs-small'
                      key={`btnToggle${Object.keys(obj)[0]}`}
                      onClick={addCaseValue}
                      style={titleBtn(obj)}
                    >
                      {Object.keys(obj)[0].charAt(0).toUpperCase() +
                        Object.keys(obj)[0].slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              {isBoardMode === true ? (
                <Board subjects={mtrls} toggleItemFunc={addMtrlValue} />
              ) : (
                <Table
                  subjects={mtrls}
                  displayTitles={displayTitles}
                  toggleItemFunc={addMtrlValue}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CaseForm;
