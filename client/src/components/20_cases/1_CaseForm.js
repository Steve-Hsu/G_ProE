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
        gClr: '',
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
        mtrlColors: [],
        expandColor: false,
      },
    ],
  });

  const { sizes, cWays, mtrls } = cases;

  //   Size func---------------------------------------------------------------------------

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

  //   ColorWay func---------------------------------------------------------------------------

  const addcWay = (e) => {
    // the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    try {
      if (cWays.length < 20) {
        setCases({
          // ...cases, = keep the rest of data.
          ...cases,
          cWays: [...cWays, { id: uuidv4(), gClr: '' }],
        });
      }
    } catch (err) {
      console.log(err);
    }

    mtrls.map((id) => {
      updateMtrlColor(id);
    });
  };

  const labelMtrlClr = (e) => {
    e.preventDefault();
    const targetID = e.target.id;
    // Prevent the computer confused two cWays so the variable named "colorWay"
    const colorWays = cWays;
    //Toggle the value
    colorWays.find(({ id }) => id === targetID).gClr = e.target.value;
    // Link each input to UserForm.state, input name matcked to state name
    setCases({ ...cases, cWays: colorWays });
  };

  const deletecWay = (e) => {
    // the e here is the app itself. Prevent it set back to default value
    e.preventDefault();

    // Delete the colorWay in the material
    // const will not allow me to sign new value in, therefore here use 'let'
    let materials = mtrls;
    materials.map((mtrl) => {
      mtrl.mtrlColors = mtrl.mtrlColors.filter(
        (mtrlColor) => mtrlColor.colorWay !== e.target.value
      );
    });

    setCases({
      // ...cases, = keep the rest of data.
      ...cases,
      cWays: cWays.filter((cWay) => cWay.id !== e.target.value),
      // Don't need this line, the state still be update, seems the inheritance is working, I still can't get it. For prevent bug, better to add this line below
      mtrls: materials,
    });
  };

  //   Materials func---------------------------------------------------------------------------

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
              mtrlColors: [],
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

  const updateMtrlColor = (targetID) => {
    const materials = mtrls;
    const material = materials.find(({ id }) => id === targetID);
    if (cWays.length > 0) {
      cWays.map((cWay) => {
        if (material.mtrlColors.lenth === 0) {
          // if mtrlColor is empty, make a new mtrlColor
          material.mtrlColors.push({
            id: uuidv4(),
            mtrl: targetID,
            colorWay: cWay.id,
            mColor: '',
          });
        } else {
          let mtrlColor = material.mtrlColors.find(
            ({ colorWay }) => colorWay === cWay.id
          );
          if (!mtrlColor) {
            // if mtrlColor dosen't match to the cWay, make a new mtrlColor
            material.mtrlColors.push({
              id: uuidv4(),
              mtrl: targetID,
              colorWay: cWay.id,
              mColor: '',
            });
          }
        }
      });
    } else {
      // No colorway set the colorway of mtrl to null
      materials.find(({ id }) => id === targetID).mtrlColors = null;
    }
    // Update the cases.matrls
    setCases({
      // ...cases, = keep the rest of data
      ...cases,
      mtrls: materials,
    });
  };

  const toggleColorSet = (e) => {
    // the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.
    const targetID = e.target.value;
    const materials = mtrls;
    const material = materials.find(({ id }) => id === targetID);

    //Toggle the value
    material.expandColor = !materials.find(({ id }) => id === targetID)
      .expandColor;

    updateMtrlColor(targetID);
  };

  const addMtrlColor = (e) => {
    e.preventDefault();

    const mtrlID = e.target.name;
    const targetID = e.target.id;
    const materials = mtrls;
    console.log(targetID);
    materials
      .find(({ id }) => id === mtrlID)
      .mtrlColors.find(({ id }) => id === targetID).mColor = e.target.value;

    // Update the cases.matrls
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
              <ColorWay
                key={cWay.id}
                cWay={cWay}
                deletecWay={deletecWay}
                labelMtrlClr={labelMtrlClr}
              />
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
                sizes={sizes}
                cWays={cWays}
                mtrl={mtrl}
                deleteMtrl={deleteMtrl}
                toggleColorSet={toggleColorSet}
                addMtrlColor={addMtrlColor}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseForm;
