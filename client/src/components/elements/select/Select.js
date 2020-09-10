import React, { useEffect } from 'react';

const Select = ({
  purpose = null,
  subject,
  optionList,
  onChange,
  required = false,
  label,
  className,
  selectedOption,
}) => {
  useEffect(() => {
    if (selectedOption === '') {
    } else {
      loadCaseSelectUnitTagIndex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  let options = [];
  switch (purpose) {
    case 'unit':
      options = [
        'Unit',
        'yds',
        'm',
        'cm',
        'in',
        'set',
        // 'print size',
        'pcs',
        'gross',
        'doz',
        'g',
      ];
      break;
    case 'currency':
      options = [
        'Currency',
        'AUD',
        'EUR',
        'HKD',
        'JPY',
        'KHR',
        'KRW',
        'MMK',
        'MYR',
        'NTD',
        'PHP',
        'RMB',
        'SGD',
        'THB',
        'USD',
        'VND',
      ];
      break;
    case null:
      options = optionList;
      break;
    default:
  }

  const loadCaseSelectUnitTagIndex = () => {
    const selected = document.getElementById(`${selectedOption}${subject.id}`);
    if (selected) {
      selected.setAttribute('selected', 'selected');
    }
  };

  //   // update the select when donwload
  //   const loadSelectTagIndex = () => {
  //     // if (currentPath !== '/api/quogarment') {
  //     document
  //       .getElementById(`${mPrice.mColor}${subject.id}`)
  //       .removeAttribute('selected');
  //     document
  //       .getElementById(`${mPrice.mColor}${subject.id}`)
  //       .setAttribute('selected', 'selected');

  //     document
  //       .getElementById(`${mPrice.sizeSPEC}${mPrice.id}`)
  //       .removeAttribute('selected');
  //     document
  //       .getElementById(`${mPrice.sizeSPEC}${mPrice.id}`)
  //       .setAttribute('selected', 'selected');
  //     // }
  //   };

  return (
    <div>
      {label ? <div className='fs-tiny  transition'>{label}</div> : null}
      <select
        id={`${purpose}${subject.id ? subject.id : subject._id}`}
        name={subject.id ? subject.id : subject._id}
        // list='garmentSize'
        // placeholder={placeholder}
        onChange={onChange}
        // default='yd'
        className={className}
        required={required}
      >
        {options.map((o) => {
          return (
            <option
              key={`${o}${subject.id ? subject.id : subject._id}`}
              id={`${o}${subject.id ? subject.id : subject._id}`}
              value={o}
            >
              {o}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
