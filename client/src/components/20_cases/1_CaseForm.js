import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Components
import Size from './1_1_Size';
import ColorWay from './1_2_ColorWay';
import Mtrl from './1_3_Mtrl';

const CaseForm = () => {
  //Set State
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
    mtrls: [
      {
        id: uuidv4(),
        item: '',
        spec: '',
        supplier: '',
        ref_no: '',
        position: '',
        description: '',
        unit: '',
        mtrlColor: [
          {
            id: uuidv4(),
          },
        ],
        expandColor: false,
      },
    ],
  });

  const { sizes, cWays, mtrls } = cases;

  const addSize = (e) => {
    // the e here is the app itself. Prevent it set back to default value
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
    // the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    console.log(e.target);
    setCases({
      // ...cases, = keep the rest of data.
      ...cases,
      sizes: sizes.filter((size) => size.id !== e.target.value),
    });
  };

  const addcWay = (e) => {
    // the e here is the app itself. Prevent it set back to default value
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
    // the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    console.log(e.target);
    setCases({
      // ...cases, = keep the rest of data.
      ...cases,
      cWays: cWays.filter((cWay) => cWay.id !== e.target.value),
    });
  };

  const addMtrl = (e) => {
    // the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    try {
      if (mtrls.length < 500) {
        setCases({
          // ...cases, = keep the rest of data.
          ...cases,
          mtrls: [
            ...mtrls,
            {
              id: uuidv4(),
              item: '',
              spec: '',
              supplier: '',
              ref_no: '',
              position: '',
              description: '',
              unit: '',
              mtrlColor: [
                {
                  id: uuidv4(),
                },
              ],
              expandColor: false,
            },
          ],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMtrl = (e) => {
    e.preventDefault();
    setCases({
      // ...cases, = keep the rest of data.
      ...cases,
      mtrls: mtrls.filter((mtrl) => mtrl.id !== e.target.value),
    });
  };

  const toggleColorSet = async (e) => {
    // the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    const targetID = e.target.value;

    const materials = cases.mtrls;
    materials.find(({ id }) => id === targetID).expandColor = !materials.find(
      ({ id }) => id === targetID
    ).expandColor;

    setCases({
      // ...cases, = keep the rest of data
      ...cases,
      mtrls: materials,
    });
  };

  return (
    <div className='p-1 test-2'>
      <div>
        <form>
          {'Import style from Excel'}
          <input type='text' name='import' id='imoprt' />
          {'Style'}
          <input type='text' name='style' id='style' />
          {'Client'}
          <input type='text' name='client' />

          {/* Size -------------------------- */}
          <div>
            {'Size'}
            <button
              name='sizeBtn'
              className='btn btn-sm btn-primary'
              onClick={addSize}
            >
              +
            </button>
          </div>
          <div className='grid-5'>
            {sizes.map((size) => (
              <Size key={size.id} size={size} deleteSize={deleteSize} />
            ))}
          </div>

          {/* ColorWay -------------------------- */}
          <div>
            {'Color Way'}
            <button
              name='cWayBtn'
              className='btn btn-sm btn-primary'
              onClick={addcWay}
            >
              +
            </button>
          </div>
          <div className='grid-5'>
            {cWays.map((cWay) => (
              <ColorWay key={cWay.id} cWay={cWay} deletecWay={deletecWay} />
            ))}
          </div>
          {/* Material -------------------------- */}
          <div>
            {'Material'}
            <button
              name='mtrlBtn'
              className='btn btn-sm btn-primary'
              onClick={addMtrl}
            >
              +
            </button>
          </div>
          <div>
            {mtrls.map((mtrl) => (
              <Mtrl
                key={mtrl.id}
                mtrl={mtrl}
                deleteMtrl={deleteMtrl}
                toggleColorSet={toggleColorSet}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseForm;
