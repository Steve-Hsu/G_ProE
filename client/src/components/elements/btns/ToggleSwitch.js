import React from 'react';

const ToggleSwitch = ({ name, checked, onChange, label_1, label_2 }) => {
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
          readOnly={osNo ? true : false}
        />
        <span className='slider round'></span>
      </label>
      <span>{mtrl[subject] == true ? 'ON' : 'OFF'}</span>
    </div>
  );
};

export default ToggleSwitch;
