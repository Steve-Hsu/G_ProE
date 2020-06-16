import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const Size = ({ size }) => {
  const casesContext = useContext(CasesContext);
  const { sizes, cWays, togglePopover, updateSize } = casesContext;

  const event = new Event('change');
  //@ Array for generate <option> tags for s<elect> tag.
  const sizeList = [
    '4XS',
    '3XS',
    '2XS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '2XL',
    '3XL',
    '4XL',
    '5XL',
  ];

  useEffect(() => {
    //If sizes is changed, then update the value of gSize"
    //I set this is because I want value update to gSize in state as we create a new select tag, since the user will see the value, it looks like the value is entered into the state, so I must set this way. All about UX.
    if (size.gSize === '') {
      //Select the next Size depaneds on last gSize
      if (sizes.length > 1) {
        selectTagIndex(sizeList);
      }
      update();
    }
    // This command prevent useless warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes]);

  //For spareting the postion of btn, here use an inline style.
  //deleteBtn in Size.
  const deleteBtnPosition = {
    top: ' 50%',
    left: '30%',
    transform: 'translate(-1rem, -1rem)',
  };

  const update = () => {
    document.getElementById(size.id).addEventListener('change', onChange);
    document.getElementById(size.id).dispatchEvent(event);
    //If I don't remove the eventListner, it will cause problems when any change happens.
    document.getElementById(size.id).removeEventListener('change', onChange);
  };

  const onChange = (e) => {
    updateSize(e);
  };

  // @Select the next Size depaneds on last gSize
  const sizeLength = sizes.length;
  const selectTagIndex = (sizeList) => {
    //Find the index of sizeList that value matched to value of previous gSize
    let previousSize = sizes[sizeLength - 2].gSize;
    if (previousSize) {
      let x = sizeList.findIndex((size) => size === previousSize);
      x = x + 1;
      console.log(sizeList[x]);
      return document
        .getElementById(`${sizeList[x]}${size.id}`)
        .setAttribute('selected', 'selected');
    }
  };

  return (
    <div className='grid-3-1 grid-gap-sm test-1 p'>
      <select
        id={size.id}
        list='garmentSize'
        placeholder='Size'
        onChange={onChange}
        autoFocus
        style={{ height: '3rem' }}
        default='XS'
      >
        {sizeList.map((s) => {
          return (
            <option key={`${s}${size.id}`} id={`${s}${size.id}`} value={s}>
              {s}
            </option>
          );
        })}
      </select>

      <button
        name='size'
        value={size.id}
        onClick={togglePopover}
        className='btn btn-danger btn-rounded-square'
        style={deleteBtnPosition}
      >
        x
      </button>
    </div>
  );
};

export default Size;

// PropTyeps
Size.propTypes = {
  size: PropTypes.object.isRequired,
};
