import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';

import MtrlClr from './1_6_1_MtrlClr';
import MtrlSizeSPEC from './1_6_2_MtrlSizeSPEC';
import MtrlCspt from './1_6_3_MtrlCspt';

const Mtrl = ({ mtrl }) => {
  useEffect(() => {
    if (mtrl.unit === '') {
    } else {
      loadCaseSelectUnitTagIndex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mtrl.unit]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const casesContext = useContext(CasesContext);
  const popoverContext = useContext(PopoverContext);

  const {
    cNo,
    cWays,
    sizes,
    mtrls,
    expandExtraPanels,
    addMtrlValue,
    addCaseValue,
  } = casesContext;

  const { togglePopover } = popoverContext;

  //For sparete the postion of btn, here use an inline style.
  //deleteBtn in mtrl.
  const deleteBtnPosition = {
    top: '1rem',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };

  const unitList = [
    'Select a Unit',
    'yds',
    'm',
    'cm',
    'in',
    'set',
    'print size',
    'pcs',
    'gross',
    'doz',
    'g',
  ];

  const loadCaseSelectUnitTagIndex = () => {
    const theMtrl = document.getElementById(`${mtrl.unit}${mtrl.id}`);
    if (theMtrl) {
      theMtrl.setAttribute('selected', 'selected');
    }
  };

  // Ajust the color of dropdown btn when the attached table is expaneded.
  const dropDownStyle = (subject) => {
    const styleObj = {
      color: 'white',
      background: 'var(--primary-color)',
      transition: 'all 0.5s',
      border: '0',
      borderBottom: '1px solid var(--primary - color)',
    };
    switch (subject) {
      case 'mtrlColor':
        if (mtrl.expandColor) {
          return styleObj;
        } else {
          return {};
        }
      case 'SizeSPEC':
        if (mtrl.expandSizeSPEC) {
          return styleObj;
        } else {
          return {};
        }
      case 'cspt':
        if (mtrl.expandCspt) {
          return styleObj;
        } else {
          return {};
        }
      default:
        return {};
    }
  };

  //@ Adjust the width of component of mColor and SizeSPEC
  const attachedTable = (subject) => {
    const columnSize = (subject) => {
      return 5;
      // switch (subject) {
      //   case 'size':
      //   case 'cspt':
      //     if (sizes.length < 6) {
      //       return 5;
      //     } else {
      //       return sizes.length;
      //     }
      //   case 'cWay':
      //     if (cWays.length < 6) {
      //       return 5;
      //     } else {
      //       return cWays.length;
      //     }
      //   default:
      //     return 5;
      // }
    };

    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columnSize(subject)}, 1fr)`,
      gridGap: '0',
    };
  };

  const item_titles = ['Item', 'Supplier', 'Ref_no', 'Position', 'Description'];

  const mtrlAttribute = (keyWord) => {
    switch (keyWord) {
      case 'Item':
        return mtrl.item;
      case 'Supplier':
        return mtrl.supplier;
      case 'Ref_no':
        return mtrl.ref_no;
      case 'Position':
        return mtrl.position;
      case 'Description':
        return mtrl.description;
      default:
    }
  };

  const onChange = (e) => {
    addMtrlValue(e);
  };

  const inputItemObj = (subject) => {
    return (
      <>
        <input
          type='text'
          id={`${subject}${mtrl.id}`}
          name={mtrl.id}
          placeholder='.'
          onChange={addMtrlValue}
          className='MPH-input'
          value={mtrlAttribute(subject) || ''}
        />
        <label htmlFor={`${subject}${mtrl.id}`} className='MPH-input-label'>
          {subject}
        </label>
      </>
    );
  };

  const toggleSwitchObj = (subject) => {
    return (
      <div className='toggleSwitch'>
        <label className='switch'>
          <input
            className='switchInput'
            id={subject}
            type='checkbox'
            name={mtrl.id}
            checked={mtrl[subject] == true}
            onChange={onChange}
          />
          <span className='slider round'></span>
        </label>
        <span>{mtrl[subject] == true ? 'ON' : 'OFF'}</span>
      </div>
    );
  };

  const onClick = (e) => {
    addCaseValue(e);
  };

  const goBack = (e) => {
    e.target.name = mtrl.id;
    e.target.id = 'isEditingMtrl';
    addMtrlValue(e);
  };

  return (
    <div className='mb-1 p-1 card' id='isEditingMtrl' onClick={onClick}>
      {/* Title area */}
      <div className='grid-6 mb-1'>
        <div className='lead'>{Number(mtrls.indexOf(mtrl) + 1)}</div>
        {/* The positon of the btn  should be reranged*/}
        <div onClick={goBack}>Go Back</div>
      </div>
      {/* Row_1  */}
      <div className='grid-6'>
        {/* Row_1 - Item */}
        <div key={`${item_titles[0]}${mtrl.id}`}>
          {inputItemObj(item_titles[0])}
        </div>
        {/* Row_1 - Supplier */}
        <div
          key={`${item_titles[1]}${mtrl.id}`}
          style={{ gridColumn: '2 / 4' }}
        >
          {inputItemObj(item_titles[1])}
        </div>
        {/* Row_1 - Ref_no */}
        <div
          key={`${item_titles[2]}${mtrl.id}`}
          style={{ gridColumn: '4 / 6' }}
        >
          {inputItemObj(item_titles[2])}
        </div>
        {/* Row_1 - Delete Btn */}
        <div>
          {cNo === null ? null : (
            <button
              value={mtrl.id}
              name='mtrl'
              onClick={togglePopover}
              className='btn btn-fade btn-square'
              style={deleteBtnPosition}
            >
              x
            </button>
          )}
        </div>
      </div>

      {/* Row_2  */}
      <div className='grid-6'>
        {/* Row_2 - Icon Space */}
        <div></div>
        {/* Row_2 - Position */}
        <div
          key={`${item_titles[3]}${mtrl.id}`}
          style={{ gridColumn: '2 / 7' }}
        >
          {inputItemObj(item_titles[3])}
        </div>
      </div>

      {/* Row_3  */}
      <div className='grid-6'>
        {/* Row_3 - Icon Space */}
        <div></div>
        {/* Row_3 - Description */}
        <div
          key={`${item_titles[4]}${mtrl.id}`}
          style={{ gridColumn: '2 / 7' }}
        >
          {inputItemObj(item_titles[4])}
        </div>
      </div>

      {/* Row_4  */}
      <div className='grid-6'>
        {/* Row_4 - Icon Space */}
        <div></div>
        <div>
          <div className='tiny text-primary transition'>
            {mtrl.multipleColor == true ? 'Multiple' : 'Single'}
          </div>
          <button
            value={mtrl.id}
            name='mtrlColor'
            onClick={expandExtraPanels}
            className='btn btn-dropdown lead'
            style={dropDownStyle('mtrlColor')}
          >
            Color
          </button>
        </div>
        <div>
          <div className='tiny text-primary transition'>
            {mtrl.multipleSPEC == true ? 'Multiple' : 'Single'}
          </div>
          <button
            value={mtrl.id}
            name='SizeSPEC'
            onClick={expandExtraPanels}
            className='btn btn-dropdown lead'
            style={dropDownStyle('SizeSPEC')}
          >
            SPEC
          </button>
        </div>
        <div>
          <div className='tiny text-primary transition'>
            {mtrl.multipleCSPT == true ? 'Multiple' : 'Single'}
          </div>
          <button
            value={mtrl.id}
            name='cspt'
            onClick={expandExtraPanels}
            className='btn btn-dropdown lead'
            style={dropDownStyle('cspt')}
          >
            Consumption
          </button>
        </div>
        {/* Row_4 - Unit Selector */}
        <div>
          <div className='tiny text-primary transition'>Unit</div>
          <select
            id={`Unit${mtrl.id}`}
            name={mtrl.id}
            list='garmentSize'
            placeholder='Unit'
            onChange={addMtrlValue}
            default='yd'
            className='select-primary-sub'
            required
          >
            {unitList.map((s) => {
              return (
                <option key={`${s}${mtrl.id}`} id={`${s}${mtrl.id}`} value={s}>
                  {s}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* {Row_3} */}
      {/* Color expand panel  */}
      {mtrl.expandColor && cWays.length > 0 ? (
        <div className='grid-1-5'>
          {/* The toggle switch for material Color */}
          <div
            style={{ height: '68px', display: 'grid', placeItems: 'center' }}
          >
            {toggleSwitchObj('multipleColor')}
          </div>
          <div style={attachedTable('cWay')} className='mt-1'>
            {mtrl.multipleColor == true ? (
              mtrl.mtrlColors.map((mtrlColor) => (
                <MtrlClr
                  key={mtrlColor.id}
                  mtrlColor={mtrlColor}
                  mtrlId={mtrl.id}
                />
              ))
            ) : (
              <MtrlClr
                key={mtrl.mtrlColors[0].id}
                mtrlColor={mtrl.mtrlColors[0]}
                mtrlId={mtrl.id}
              />
            )}
          </div>
        </div>
      ) : null}
      {/* SizeSPEC expand panel  */}
      {mtrl.expandSizeSPEC && sizes.length > 0 ? (
        <div className='grid-1-5'>
          {/* The toggle switch for material SPEC */}
          <div
            style={{ height: '68px', display: 'grid', placeItems: 'center' }}
          >
            {toggleSwitchObj('multipleSPEC')}
          </div>
          <div style={attachedTable('size')} className='mt-1'>
            {mtrl.multipleSPEC == true ? (
              mtrl.sizeSPECs.map((sizeSPEC) => (
                <MtrlSizeSPEC
                  key={sizeSPEC.id}
                  sizeSPEC={sizeSPEC}
                  mtrlId={mtrl.id}
                />
              ))
            ) : (
              <MtrlSizeSPEC
                key={mtrl.sizeSPECs[0].id}
                sizeSPEC={mtrl.sizeSPECs[0]}
                mtrlId={mtrl.id}
              />
            )}
          </div>
        </div>
      ) : null}
      {/* cspt expand panel  */}
      {mtrl.expandCspt && mtrl.cspts.length > 0 ? (
        <div className='grid-1-5'>
          {/* The toggle switch for material SPEC */}
          <div
            style={{ height: '68px', display: 'grid', placeItems: 'center' }}
          >
            {toggleSwitchObj('multipleCSPT')}
          </div>
          <div style={attachedTable('cspt')} className='mt-1'>
            {mtrl.multipleCSPT == true ? (
              sizes.map((size) => (
                <MtrlCspt
                  key={`Fragment${size.id}${mtrl.id}`}
                  size={size}
                  mtrl={mtrl}
                />
              ))
            ) : (
              <MtrlCspt
                key={`Fragment${sizes[0].id}${mtrl.id}`}
                size={sizes[0]}
                mtrl={mtrl}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Mtrl;

// PropTyeps
Mtrl.propTypes = {
  mtrl: PropTypes.object.isRequired,
};
