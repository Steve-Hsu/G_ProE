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

  let supplier,
    ref_no,
    position,
    descriptions = false;

  const trueInDisplayTitles = displayTitles.filter((obj) => {
    return Object.values(obj)[0] == true;
  }).length;

  displayTitles.filter((obj) => {
    switch (Object.keys(obj)[0]) {
      case 'supplier':
        supplier = obj['supplier'];
        break;
      case 'ref_no':
        ref_no = obj['ref_no'];
        break;
      case 'position':
        position = obj['position'];
        break;
      case 'descriptions':
        descriptions = obj['descriptions'];
        break;
      default:
    }
  });

  // const cellStyle = (keyWord, switcher = 4) => {
  //   let width = '13%';
  //   switch (keyWord) {
  //     case 'no':
  //       width = '3%';
  //       break;
  //     case 'supplier':
  //     case 'item':
  //       width = '13%';
  //       break;
  //     case 'ref_no':
  //       switch (switcher) {
  //         case 2:
  //           if (supplier) {
  //             width = '63%';
  //           }
  //           break;
  //         case 1:
  //           width = '78%';
  //         default:
  //           width = '13%';
  //       }
  //       break;
  //     case 'descriptions':
  //     case 'position':
  //       switch (switcher) {
  //         case 4:
  //           width = '23%';
  //           // console.log('Now', keyWord, ' applying width', width); // Test Code
  //           break;
  //         case 3:
  //           if (!position || !descriptions) {
  //             width = '48%';
  //             // console.log('Now', keyWord, ' applying width', width); // Test Code
  //           } else {
  //             width = '30.5%';
  //             // console.log('Now', keyWord, ' applying width', width); // Test Code
  //           }
  //           break;
  //         case 2:
  //           if (!position || !descriptions) {
  //             width = '63%';
  //             // console.log('Now', keyWord, ' applying width 63%'); // Test Code
  //           } else {
  //             width = '38%';
  //             // console.log('Now', keyWord, ' applying width', width); // Test Code
  //           }
  //           break;
  //         case 1:
  //           width = '78%';
  //           // console.log('Now', keyWord, ' applying width', width); // Test Code
  //           break;
  //         default:
  //           width = '23%';
  //         // console.log('Now', keyWord, ' applying width', width); // Test Code
  //       }
  //     default:
  //   }
  //   let style = {
  //     width,
  //     height: '2.5rem',
  //     display: 'flex',
  //     whiteSpace: 'nowrap',
  //     overflowY: 'auto',
  //     margin: '0 1%',
  //     padding: '0.5rem 0',
  //   };
  //   return style;
  // };

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

  const mtrlItems = (switcher) => {
    const valueOfItems = mtrls.map((mtrl) => {
      return mtrl.item;
    });
    const uniques = valueOfItems.filter((item, idx) => {
      return valueOfItems.indexOf(item) == idx;
    });

    const lengthOfItems = uniques.map((uni) => {
      return mtrls.filter((mtrl) => mtrl.item === uni).length;
    });

    const result = uniques.map((uni) => {
      if (uni == '') {
        return 'undefined';
      } else if (uni) {
        return uni;
      } else {
        return 'empty';
      }
    });
    switch (switcher) {
      case 'result':
        return result;

      case 'lengthOfItems':
        return lengthOfItems;

      case 'unique':
        return uniques;
      default:
    }
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
                <div>
                  {mtrlItems('result').map((mtrlItem, idx) => (
                    <div
                      key={`boardOf${mtrlItem}`}
                      className='mt-1 bg-cp-bg round-area'
                    >
                      <div className='grid-4 p-1'>
                        <div className='fc-cp-2'>{mtrlItem.toUpperCase()}</div>
                        <div className='fc-cp-1'>
                          The number of this material is{' '}
                          {mtrlItems('lengthOfItems')[idx]}
                        </div>
                      </div>
                      <div className='center-content'>
                        <div
                          className='boardParent'
                          key={`flexBoxOf${mtrlItem}`}
                        >
                          {mtrls.map((mtrl) => {
                            var re = new RegExp(mtrl.item, 'i');
                            switch (mtrl.item) {
                              case undefined:
                                if (mtrlItem === 'empty') {
                                  return (
                                    <MtrlBoard
                                      key={`empty${mtrl.id}`}
                                      mtrl={mtrl}
                                    ></MtrlBoard>
                                  );
                                } else {
                                  return null;
                                }
                              case '':
                                if (mtrlItem === 'undefined') {
                                  return (
                                    <MtrlBoard
                                      key={`undefined${mtrl.id}`}
                                      mtrl={mtrl}
                                    ></MtrlBoard>
                                  );
                                } else {
                                  return null;
                                }
                              default:
                                if (re.test(mtrlItems('unique')[idx])) {
                                  return (
                                    <MtrlBoard
                                      key={`unique${mtrl.id}`}
                                      mtrl={mtrl}
                                    ></MtrlBoard>
                                  );
                                } else {
                                  return null;
                                }
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
