import React from 'react';

//#### Notice !!! Not finish this obj yet !!!
const ToggleSwitch = ({ id, name, checked, onChange, readOnlyIndicator }) => {
  return (
    <div className='toggleSwitch'>
      <label className='switch'>
        <input
          className='switchInput'
          id={id}
          type='checkbox'
          name={name}
          checked={checked == true}
          onChange={onChange}
          readOnly={readOnlyIndicator ? true : false}
        />
        <span className='slider round'></span>
      </label>
      <span>{checked == true ? 'ON' : 'OFF'}</span>
    </div>
  );
};

export default ToggleSwitch;

// const toggleSwitchObj = (subject) => {
//   return (
//     <div className='toggleSwitch'>
//       <label className='switch'>
//         <input
//           className='switchInput'
//           id={subject}
//           type='checkbox'
//           name={mtrl.id}
//           checked={mtrl[subject] == true}
//           onChange={onChange}
//           readOnly={osNo ? true : false}
//         />
//         <span className='slider round'></span>
//       </label>
//       <span>{mtrl[subject] == true ? 'ON' : 'OFF'}</span>
//     </div>
//   );
// };
