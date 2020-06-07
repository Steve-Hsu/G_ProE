import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Components
import Sizes from './1_1_Sizes';
import ColorWays from './1_2_ColorWays';

const CaseForm = () => {
  const [cases, setCases] = useState({
    style: '',
    client: '',
    cWays: [
      {
        id: uuidv4(),
        value: '',
      },
    ],
    sizes: [
      {
        id: uuidv4(),
        value: '',
      },
    ],
  });

  const { sizes, cWays } = cases;

  const addSize = (e) => {
    e.preventDefault();
    try {
      if (sizes.length < 15) {
        setCases({
          // ...cases, = keep the rest of data.
          ...cases,
          sizes: [...sizes, { id: uuidv4(), value: '' }],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSize = (e) => {
    e.preventDefault();
    console.log(e.target);
    setCases({
      // ...cases, = keep the rest of data.
      ...cases,
      sizes: sizes.filter((size) => size.id !== e.target.value),
    });
  };

  const addcWay = (e) => {
    e.preventDefault();
    try {
      if (cWays.length < 20) {
        setCases({
          // ...cases, = keep the rest of data.
          ...cases,
          cWays: [...cWays, { id: uuidv4(), value: '' }],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletecWay = (e) => {
    e.preventDefault();
    console.log(e.target);
    setCases({
      // ...cases, = keep the rest of data.
      ...cases,
      cWays: cWays.filter((cWay) => cWay.id !== e.target.value),
    });
  };

  return (
    <div className='caseform container'>
      <div>
        <form>
          {/* <label for='style'>Style</label> */}
          {'Style'}
          <input type='text' name='style' id='style' />
          {'Client'}
          <input type='text' name='client' />
          <Sizes sizes={sizes} addSize={addSize} deleteSize={deleteSize} />

          <ColorWays cWays={cWays} addcWay={addcWay} deletecWay={deletecWay} />
        </form>
      </div>
    </div>
  );
};

export default CaseForm;
