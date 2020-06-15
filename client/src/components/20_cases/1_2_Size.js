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
    update();
  }, [sizes]);

  //For spareting the postion of btn, here use an inline style.
  //deleteBtn in Size.
  const deleteBtnPosition = {
    top: ' 50%',
    left: '30%',
    transform: 'translate(-1rem, -1rem)',
  };

  const update = () => {
    const selectTag = document.getElementById(size.id);
    selectTag.addEventListener('change', onChange);
    selectTag.dispatchEvent(event);

    let trytry = document.getElementById(`2XL${size.id}`);
    console.log(selectTag);
    console.log(trytry);
  };

  const onChange = (e) => {
    updateSize(e);
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
        // ref={mySelect}
      >
        {sizeList.map((s) => (
          <option key={`${s}${size.id}`} id={`${s}${size.id}`} value={s}>
            {s}
          </option>
        ))}
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

{
  /* <input
        id={size.id}
        list='garmentSize'
        placeholder='Size'
        onChange={updateSize}
        maxLength={sizeLength}
        autoFocus
        style={{ height: '3rem' }}
      /> */
}
