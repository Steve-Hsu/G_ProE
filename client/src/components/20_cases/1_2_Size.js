import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const Size = ({ size }) => {
  const casesContext = useContext(CasesContext);
  const { togglePopover, updateSize } = casesContext;
  //For sparete the postion of btn, here use an inline style.
  //deleteBtn in Size.
  const deleteBtnPosition = {
    top: ' 50%',
    left: '30%',
    transform: 'translate(-1rem, -1rem)',
  };

  return (
    <div className='grid-3-1 grid-gap-sm test-1 p'>
      <input
        id={size.id}
        type='text'
        placeholder='Size'
        onChange={updateSize}
        autoFocus
      />
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
