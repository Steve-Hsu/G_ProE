import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';

import MtrlClr from './1_4_1_MtrlClr';
import MtrlSizeSPEC from './1_4_2_MtrlSizeSPEC';
import MtrlCspt from './1_4_3_MtrlCspt';

const Mtrl = ({ mtrl }) => {
  useEffect(() => {
    if (mtrl.unit === '') {
    } else {
      loadCaseSelectUnitTagIndex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mtrl.unit]);

  const casesContext = useContext(CasesContext);
  const popoverContext = useContext(PopoverContext);

  const { cWays, sizes, expandExtraPanels, addMtrlValue } = casesContext;

  const { togglePopover } = popoverContext;

  //For sparete the postion of btn, here use an inline style.
  //deleteBtn in mtrl.
  const deleteBtnPosition = {
    top: ' 70%',
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
    document
      .getElementById(`${mtrl.unit}${mtrl.id}`)
      .setAttribute('selected', 'selected');
  };

  // Ajust the color of dropdown btn when the attached table is expaneded.
  const dropDownStyle = (subject) => {
    switch (subject) {
      case 'mtrlColor':
        if (mtrl.expandColor) {
          return {
            color: 'white',
            background: 'var(--primary-color)',
            // transition: 'all 0.5s',
            border: '0',
            borderBottom: '1px solid var(--primary - color)',
          };
        } else {
          return {};
        }
      case 'SizeSPEC':
        if (mtrl.expandSizeSPEC) {
          return {
            color: 'white',
            background: 'var(--primary-color)',
            transition: 'all 0.5s',
            border: '0',
            borderBottom: '1px solid var(--primary - color)',
          };
        } else {
          return {};
        }
      case 'cspt':
        if (mtrl.expandCspt) {
          return {
            color: 'white',
            background: 'var(--primary-color)',
            transition: 'all 0.5s',
            border: '0',
            borderBottom: '1px solid var(--primary - color)',
          };
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
      switch (subject) {
        case 'size':
        case 'cspt':
          if (sizes.length < 6) {
            return 5;
          } else {
            return sizes.length;
          }
        case 'cWay':
          if (cWays.length < 6) {
            return 5;
          } else {
            return cWays.length;
          }
        default:
          return 5;
      }
    };

    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columnSize(subject)}, 1fr)`,
      gridGap: '0',
    };
  };

  const row_1_titles = [
    'Item',
    'SPEC',
    'Supplier',
    'Ref_no',
    'Position',
    'Description',
  ];

  const mtrlAttribute = (keyWord) => {
    switch (keyWord) {
      case 'Item':
        return mtrl.item;
      case 'SPEC':
        return mtrl.spec;
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

  return (
    <div className='mb-1 p-1 card'>
      {/* Row_1  */}
      <div className='grid-6 pb'>
        {row_1_titles.map((a) => (
          <div key={`${a}${mtrl.id}`}>
            <input
              type='text'
              id={`${a}${mtrl.id}`}
              name={mtrl.id}
              placeholder='.'
              onChange={addMtrlValue}
              className='MPH-input'
              value={mtrlAttribute(a) || ''}
            />
            <label htmlFor={`${a}${mtrl.id}`} className='MPH-input-label'>
              {a}
            </label>
          </div>
        ))}
      </div>
      {/* Row_2  */}
      <div className='grid-6 pb'>
        <div>Icon</div>
        <div>
          {mtrl.unit === '' ? (
            <div
              style={{ opacity: '0' }}
              className='tiny text-primary transition'
            >
              .
            </div>
          ) : (
            <div className='tiny text-primary transition'>Unit</div>
          )}
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
        <div>
          {mtrl.unit === '' ? (
            <div
              style={{ opacity: '0' }}
              className='tiny text-primary transition'
            >
              .
            </div>
          ) : (
            <div className='tiny text-primary transition'>Material Color</div>
          )}
          <button
            value={mtrl.id}
            name='mtrlColor'
            onClick={expandExtraPanels}
            className='btn btn-dropdown lead'
            style={dropDownStyle('mtrlColor')}
          >
            Color set
          </button>
        </div>
        <div>
          {mtrl.unit === '' ? (
            <div
              style={{ opacity: '0' }}
              className='tiny text-primary transition'
            >
              .
            </div>
          ) : (
            <div className='tiny text-primary transition'>SPEC</div>
          )}
          <button
            value={mtrl.id}
            name='SizeSPEC'
            onClick={expandExtraPanels}
            className='btn btn-dropdown lead'
            style={dropDownStyle('SizeSPEC')}
          >
            Size SPEC
          </button>
        </div>
        <div>
          {mtrl.unit === '' ? (
            <div
              style={{ opacity: '0' }}
              className='tiny text-primary transition'
            >
              .
            </div>
          ) : (
            <div className='tiny text-primary transition'>Consumption</div>
          )}
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

        <div>
          <button
            value={mtrl.id}
            name='mtrl'
            onClick={togglePopover}
            className='btn btn-fade btn-square'
            style={deleteBtnPosition}
          >
            x
          </button>
        </div>
      </div>
      {/* {Row_3} */}
      {/* Color expand panel  */}
      {mtrl.expandColor && cWays.length > 0 ? (
        <div className='grid-1-5'>
          <div></div>
          <div style={attachedTable('cWay')}>
            {mtrl.mtrlColors.map((mtrlColor) => (
              <MtrlClr
                key={mtrlColor.id}
                mtrlColor={mtrlColor}
                mtrlId={mtrl.id}
              />
            ))}
          </div>
        </div>
      ) : null}
      {/* SizeSPEC expand panel  */}
      {mtrl.expandSizeSPEC && sizes.length > 0 ? (
        <div className='grid-1-5'>
          <div></div>
          <div style={attachedTable('size')}>
            {mtrl.sizeSPECs.map((sizeSPEC) => (
              <MtrlSizeSPEC
                key={sizeSPEC.id}
                sizeSPEC={sizeSPEC}
                mtrlId={mtrl.id}
              />
            ))}
          </div>
        </div>
      ) : null}
      {/* cspt expand panel  */}
      {mtrl.expandCspt && mtrl.cspts.length > 0 ? (
        <div className='grid-1-5'>
          <div>Consumption</div>
          <div style={attachedTable('cspt')}>
            {sizes.map((size) => (
              <MtrlCspt
                key={`Fragment${size.id}${mtrl.id}`}
                size={size}
                mtrl={mtrl}
              />
            ))}
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
