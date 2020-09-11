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
  id,
}) => {
  useEffect(() => {
    loadCaseSelectUnitTagIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);

  // useEffect(() => {
  //   if (selectedOption === '') {
  //   } else {
  //     loadCaseSelectUnitTagIndex();
  //   }
  //   // if (id === null) {
  //   //   if (subject.id) {
  //   //     id = purpose + subject.id;
  //   //   } else {
  //   //     id = purpose + subject._id;
  //   //   }
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedOption]);

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
    default:
      options = optionList;
  }

  const loadCaseSelectUnitTagIndex = () => {
    let selected = null;
    if (selectedOption) {
      selected = document.getElementById(
        `${purpose}${selectedOption}${subject.id}`
      );
    } else {
      selected = document.getElementById(`${purpose}empty${subject.id}`);
    }
    if (selected) {
      selected.removeAttribute('selected');
      selected.setAttribute('selected', 'selected');
      console.log('the seleted in select', selected);
    }
  };

  const theId = (id) => {
    if (id) {
      return id;
    } else {
      return `${purpose}${subject.id ? subject.id : subject._id}`;
    }
  };

  return (
    <div>
      {label ? <div className='fs-tiny  transition'>{label}</div> : null}
      <select
        // id={`${purpose}${subject.id ? subject.id : subject._id}`}
        id={theId(id)}
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
              id={
                o
                  ? `${purpose}${o}${subject.id ? subject.id : subject._id}`
                  : `${purpose}empty${subject.id ? subject.id : subject._id}`
              }
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
