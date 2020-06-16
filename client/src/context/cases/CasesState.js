import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import CasesContext from './casesContext';
import CasesReducer from './casesReducer';

//@Global Header for token

import {
  SIZE_ADD,
  SIZE_UPDATE,
  SIZE_DELETE,
  CLR_WAY_ADD,
  CLR_WAY_UPDATE,
  CLR_WAY_DELETE,
  MTRL_ADD,
  MTRL_UPDATE,
  MTRL_DELETE,
  CASE_TOGGLE_POPOVER,
  CASE_DOWNLOAD,
  CASE_QTY_UPDATE,
  CURRENT_ADD,
  CURRENT_DELETE,
  STYLE_UPDATE,
  CLIENT_UPDATE,
} from '../types';

const CasesState = (props) => {
  // @State
  const initialStete = {
    user: null,
    company: null,
    style: null,
    client: null,
    cWays: [],
    sizes: [],
    gQtys: [],
    mtrls: [],
    popover: false,
    current: null,
    formIsHalfFilledOut: true,
  };

  // @object Model
  // For setting state more convenient
  const newCWay = {
    id: uuidv4(),
    gClr: '',
  };
  const newSize = {
    id: uuidv4(),
    gSize: '',
  };
  let newgQty = {
    id: uuidv4(),
    cWay: '',
    size: '',
    gQty: '',
  };

  // According to React : default input should not be an 'null'
  const newMtrl = {
    id: uuidv4(),
    item: '',
    spec: '',
    supplier: '',
    ref_no: '',
    position: '',
    description: '',
    unit: '',
    mtrlColors: [],
    sizeSPECs: [],
    cspts: [],
    MIC: '',
    expandColor: false,
    expandSizeSPEC: false,
    expandCspt: false,
  };

  let newMtrlColor = {
    id: uuidv4(),
    mtrl: '',
    cWay: '',
    mColor: '',
  };

  let newSizeSPEC = {
    id: uuidv4(),
    mtrl: '',
    size: '',
    mSizeSPEC: '',
  };

  let newCspt = {
    id: uuidv4(),
    cWay: '',
    size: '',
    gQty: '',
    mtrl: '',
    // Human readable info :
    gClr: '',
    gSize: '',
    mColor: '',
    mSizeSPEC: '',
    unit: '',
    cspt: '',
    requiredMQty: 0,
  };

  const [state, dispatch] = useReducer(CasesReducer, initialStete);
  const { sizes, cWays, gQtys, mtrls } = state;

  // @Actions ----------------------------------------------------------------------------------------------------------
  // Only applying in this scope for other functions ----------
  const updateMaterials = (materials) => {
    dispatch({ type: MTRL_UPDATE, payload: materials });
  };

  // @gQtys.gQty item ----------------------------
  const addQtyBycWay = (cWayId) => {
    sizes.map((size) => {
      newgQty = {
        ...newgQty,
        id: uuidv4(),
        cWay: cWayId,
        size: size.id,
      };
      addMtrlCsptBygQty(newgQty);
      return gQtys.push(newgQty);
    });
    dispatch({ type: CASE_QTY_UPDATE, payload: gQtys });
  };

  const addQtyBySize = (sizeId) => {
    cWays.map((cWay) => {
      newgQty = {
        ...newgQty,
        id: uuidv4(),
        cWay: cWay.id,
        size: sizeId,
      };
      addMtrlCsptBygQty(newgQty);
      return gQtys.push(newgQty);
    });
    dispatch({ type: CASE_QTY_UPDATE, payload: gQtys });
  };

  const deletegQtyBycWay = (cWayId) => {
    let Qtys = gQtys.filter((gQty) => gQty.cWay !== cWayId);
    dispatch({ type: CASE_QTY_UPDATE, payload: Qtys });
  };

  const deletegQtyBySize = (sizeId) => {
    let Qtys = gQtys.filter((gQty) => gQty.size !== sizeId);
    dispatch({ type: CASE_QTY_UPDATE, payload: Qtys });
  };

  // @mtrl.cspts.cspt item ----------------------------
  const addMtrlCsptBygQty = (gQty) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      newCspt = {
        ...newCspt,
        id: uuidv4(),
        cWay: gQty.cWay,
        size: gQty.size,
        gQty: gQty.id,
        mtrl: mtrl.id,
      };
      return mtrl.cspts.push(newCspt);
    });
    updateMaterials(materials);
  };

  const updateCsptgClr = (mtrlId, cWayId) => {
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    let garmentClr = cWays.find(({ id }) => id === cWayId).gClr;
    material.cspts.map((cspt) => {
      if (cspt.cWay === cWayId) {
        cspt.gClr = garmentClr;
      }
      return materials;
    });
    updateMaterials(materials);
  };

  const updateCsptgSize = (mtrlId, sizeId) => {
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    let garmentSize = sizes.find(({ id }) => id === sizeId).gSize;
    material.cspts.map((cspt) => {
      if (cspt.size === sizeId) {
        cspt.gSize = garmentSize;
      }
      return materials;
    });
    updateMaterials(materials);
  };

  const updateCsptmColor = (mtrlId, mtrlColorId) => {
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    let materialClrObj = material.mtrlColors.find(
      ({ id }) => id === mtrlColorId
    );
    let materialClr = materialClrObj.mColor;

    material.cspts.map((cspt) => {
      let cWayId = materialClrObj.cWay;
      if (cspt.cWay === cWayId) {
        cspt.mColor = materialClr;
      }
      return materials;
    });
    updateMaterials(materials);
  };

  const updateCsptmSizeSPEC = (mtrlId, SizeSPECId) => {
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    let sizeSPECObj = material.sizeSPECs.find(({ id }) => id === SizeSPECId);
    let materialSizeSPEC = sizeSPECObj.mSizeSPEC;

    material.cspts.map((cspt) => {
      let sizeId = sizeSPECObj.size;
      if (cspt.size === sizeId) {
        cspt.mSizeSPEC = materialSizeSPEC;
      }
      return materials;
    });
    updateMaterials(materials);
  };

  const updateCsptRequiredMQty = (mtrlId, gQtyId) => {
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    let Qty = gQtys.find(({ id }) => id === gQtyId).gQty;

    material.cspts.map((cspt) => {
      if (cspt.gQty === gQtyId) {
        cspt.requiredMQty = cspt.cspt * Qty;
      }
      return materials;
    });
    updateMaterials(materials);
  };

  const deleteMtrlCsptBycWay = (cWayId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      return (mtrl.cspts = mtrl.cspts.filter((cspt) => cspt.cWay !== cWayId));
    });
    updateMaterials(materials);
  };

  const deleteMtrlCsptBySize = (sizeId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      return (mtrl.cspts = mtrl.cspts.filter((cspt) => cspt.size !== sizeId));
    });
    updateMaterials(materials);
  };

  // @mtrl.mtrlColors.mtrlColor item ----------------------------
  const addMtrlColor = (cWayId) => {
    let materials = mtrls;

    materials.map((mtrl) => {
      newMtrlColor = {
        ...newMtrlColor,
        mtrl: mtrl.id,
        cWay: cWayId,
      };
      return mtrl.mtrlColors.push(newMtrlColor);
    });
    updateMaterials(materials);
  };

  const deleteMtrlColor = (cWayId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      return (mtrl.mtrlColors = mtrl.mtrlColors.filter(
        (mtrlColor) => mtrlColor.cWay !== cWayId
      ));
    });
    updateMaterials(materials);
  };

  // @mtrl.mSizeSPECs.mSizeSPEC item ----------------------------
  const addMtrlSizeSPEC = (sizeId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      newSizeSPEC = {
        ...newSizeSPEC,
        mtrl: mtrl.id,
        size: sizeId,
      };
      return mtrl.sizeSPECs.push(newSizeSPEC);
    });
    updateMaterials(materials);
  };

  const deleteMtrlSizeSPEC = (sizeId) => {
    let materials = mtrls;
    materials.map((mtrl) => {
      return (mtrl.sizeSPECs = mtrl.sizeSPECs.filter(
        (mtrlSPEC) => mtrlSPEC.size !== sizeId
      ));
    });
    updateMaterials(materials);
  };

  // @Export using functions ----------------------------------------------------------------------------------------------------------
  const addcWay = (e) => {
    e.preventDefault();
    if (cWays.length < 20) {
      // Add the new color way to each material
      addQtyBycWay(newCWay.id);
      addMtrlColor(newCWay.id);

      dispatch({ type: CLR_WAY_ADD, payload: newCWay });
    }

    // Update all new cspt generated by the new cWay.
    sizes.map((size) =>
      mtrls.map((mtrl) => {
        // update gSize in all new cspt generated by the new cWay.
        updateCsptgSize(mtrl.id, size.id);
        // update sizeSPEC in all new cspt generated by the new cWay.
        // The .find() will confused by name "size" of attribute in the sizes and the attribute of sizeSPECs, so must const a new name ,in this case, the "sizeId", for the size.id
        const sizeId = size.id;
        let mSizeSPECId = mtrl.sizeSPECs.find(({ size }) => size === sizeId).id;
        updateCsptmSizeSPEC(mtrl.id, mSizeSPECId);
      })
    );
  };

  const updatecWay = (e) => {
    e.preventDefault();
    const targetID = e.target.id;
    // Prevent the computer confused two cWays so the variable named "colorWay"
    const colorWays = cWays;
    //Toggle the value
    colorWays.find(({ id }) => id === targetID).gClr = e.target.value;
    dispatch({ type: CLR_WAY_UPDATE, payload: colorWays });

    // update gColor in cspt
    mtrls.map((mtrl) => updateCsptgClr(mtrl.id, targetID));
  };

  const deletecWay = (e) => {
    e.preventDefault();
    const cWayId = e.target.value;
    //Delete the cWay in eatch mtrl
    deletegQtyBycWay(cWayId);
    deleteMtrlColor(cWayId);
    deleteMtrlCsptBycWay(cWayId);
    dispatch({ type: CLR_WAY_DELETE, payload: cWayId });
  };

  const addSize = (e) => {
    // e.preventDefault : the e here is the app itself. Prevent it set back to default value
    e.preventDefault();
    // Add the new Size to each material

    if (sizes.length < 15) {
      addQtyBySize(newSize.id);
      addMtrlSizeSPEC(newSize.id);
      dispatch({ type: SIZE_ADD, payload: newSize });
    }

    // update gColor in all new cspt generated by the new Size.
    cWays.map((cWay) =>
      mtrls.map((mtrl) => {
        updateCsptgClr(mtrl.id, cWay.id);
        // update sizeSPEC in all new cspt generated by the new cWay.
        // The .find() will confused by name "size" of attribute in the sizes and the attribute of sizeSPECs, so must const a new name ,in this case, the "sizeId", for the size.id
        const cWayId = cWay.id;
        let mColorId = mtrl.mtrlColors.find(({ cWay }) => cWay === cWayId).id;
        updateCsptmColor(mtrl.id, mColorId);
      })
    );
  };

  const updateSize = (e) => {
    e.preventDefault();
    const targetID = e.target.id;
    // Prevent the computer confused two cWays so the variable named "colorWay"
    let gSizes = sizes;
    //Toggle the value
    gSizes.find(({ id }) => id === targetID).gSize = e.target.value;
    console.log(gSizes);
    dispatch({ type: SIZE_UPDATE, payload: gSizes });
    // update gSize in cspt
    mtrls.map((mtrl) => updateCsptgSize(mtrl.id, targetID));
  };

  const deleteSize = (e) => {
    e.preventDefault();
    const sizeId = e.target.value;
    //Delete the size SPEC in eatch mtrl
    deletegQtyBySize(sizeId);
    deleteMtrlSizeSPEC(sizeId);
    deleteMtrlCsptBySize(sizeId);
    dispatch({ type: SIZE_DELETE, payload: sizeId });
  };

  const addMtrl = (e) => {
    e.preventDefault();
    //Update the mtrlColors to the new mtrl, before adding it to mtrls
    cWays.map((cWay) => {
      return newMtrl.mtrlColors.push({
        id: uuidv4(),
        mtrl: newMtrl.id,
        cWay: cWay.id,
        mColor: '',
      });
    });
    //Update the mtrlSizeSPEC to the new mtrl, before adding it to mtrls
    sizes.map((size) => {
      return newMtrl.sizeSPECs.push({
        id: uuidv4(),
        mtrl: newMtrl.id,
        size: size.id,
        mSizeSPEC: '',
      });
    });
    //Update the cspt to the new mtrl, before adding it to mtrls
    gQtys.map((gQty) => {
      newCspt = {
        ...newCspt,
        id: uuidv4(),
        cWay: gQty.cWay,
        size: gQty.size,
        gQty: gQty.id,
        mtrl: newMtrl.id,
        gClr: cWays.find(({ id }) => id === gQty.cWay).gClr,
        gSize: sizes.find(({ id }) => id === gQty.size).gSize,
      };
      return newMtrl.cspts.push(newCspt);
    });

    if (mtrls.length < 500) {
      dispatch({ type: MTRL_ADD, payload: newMtrl });
    }
  };

  const deleteMtrl = (e) => {
    const id = e.target.value;
    e.preventDefault();
    dispatch({ type: MTRL_DELETE, payload: id });
  };

  // @Layer 2 functions ----------------------------------------------------------------------------------------------------------
  const expandMtrlColor = (e) => {
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.
    const mtrlId = e.target.value;
    const materials = mtrls;
    materials.find(({ id }) => id === mtrlId).expandColor = !materials.find(
      ({ id }) => id === mtrlId
    ).expandColor;

    updateMaterials(materials);
  };

  const expandSizeSPEC = (e) => {
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.
    const mtrlId = e.target.value;
    const materials = mtrls;
    materials.find(({ id }) => id === mtrlId).expandSizeSPEC = !materials.find(
      ({ id }) => id === mtrlId
    ).expandSizeSPEC;

    updateMaterials(materials);
  };

  const expandMtrlCspt = (e) => {
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.
    const mtrlId = e.target.value;
    const materials = mtrls;
    materials.find(({ id }) => id === mtrlId).expandCspt = !materials.find(
      ({ id }) => id === mtrlId
    ).expandCspt;

    updateMaterials(materials);
  };

  //@Add value from input to state ----------------------------------------------------------------------------------------------------------

  const addValueMtrlColor = (e) => {
    e.preventDefault();
    const mtrlId = e.target.name;
    const mtrlColorId = e.target.id;
    //??? This code works, however I still don't know why the sup variable will affect parent variable here.
    //There is something chainning the materials to the sub array material
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    material.mtrlColors.find(({ id }) => id === mtrlColorId).mColor =
      e.target.value;

    updateMaterials(materials);
    //Update the mColor in cspt of the mtrl
    updateCsptmColor(mtrlId, mtrlColorId);
  };

  const addValueMtrlSizeSPEC = (e) => {
    e.preventDefault();
    const mtrlId = e.target.name;
    const mtrlSizeSPECId = e.target.id;
    //??? This code works, however I still don't know why the sup variable will affect parent variable here.
    //There is something chainning the materials to the sub array material
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    material.sizeSPECs.find(({ id }) => id === mtrlSizeSPECId).mSizeSPEC =
      e.target.value;

    updateMaterials(materials);
    //Update the mSizeSPCE in cspt of the mtrl
    updateCsptmSizeSPEC(mtrlId, mtrlSizeSPECId);
  };

  const addValueMtrlCspt = (e) => {
    e.preventDefault();
    const mtrlId = e.target.name;
    const mtrlCspt = e.target.id;
    //??? This code works, however I still don't know why the sup variable will affect parent variable here.
    //There is something chainning the materials to the sub array material
    let materials = mtrls;
    let material = materials.find(({ id }) => id === mtrlId);
    material.cspts.find(({ id }) => id === mtrlCspt).cspt = e.target.value;
    let gQtyId = material.cspts.find(({ id }) => id === mtrlCspt).gQty;
    updateCsptRequiredMQty(mtrlId, gQtyId);

    updateMaterials(materials);
  };

  const addMtrlValue = (e) => {
    e.preventDefault();
    const mtrlId = e.target.id;
    let materials = mtrls;
    switch (e.target.name) {
      case 'item':
        materials.find(({ id }) => id === mtrlId).item = e.target.value;
        break;
      case 'spec':
        materials.find(({ id }) => id === mtrlId).spec = e.target.value;
        break;
      case 'supplier':
        materials.find(({ id }) => id === mtrlId).supplier = e.target.value;
        break;
      case 'ref_no':
        materials.find(({ id }) => id === mtrlId).ref_no = e.target.value;
        break;
      case 'position':
        materials.find(({ id }) => id === mtrlId).position = e.target.value;
        break;
      case 'description':
        materials.find(({ id }) => id === mtrlId).description = e.target.value;
        break;
      case 'unit':
        materials.find(({ id }) => id === mtrlId).unit = e.target.value;
        break;
      default:
    }
    updateMaterials(materials);
  };

  const addCaseValue = (e) => {
    e.preventDefault();
    try {
      if (e.target.name === 'style') {
        dispatch({ type: STYLE_UPDATE, payload: e.target.value });
      } else if (e.target.name === 'client') {
        dispatch({ type: CLIENT_UPDATE, payload: e.target.value });
      } else if (e.target.name === 'gQty') {
        let Qtys = gQtys;
        let Qty = Qtys.find(({ id }) => id === e.target.id);
        Qty.gQty = e.target.value;

        dispatch({ type: CASE_QTY_UPDATE, payload: Qtys });
        mtrls.map((mtrl) => updateCsptRequiredMQty(mtrl.id, Qty.id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // @Other functions ----------------------------------------------------------------------------------------------------------

  const togglePopover = (e) => {
    e.preventDefault();
    //The id is set in the value of the btn when which is created. so here we fetch id by e.target.value.

    const newPopover = !state.popover;
    dispatch({ type: CASE_TOGGLE_POPOVER, payload: newPopover });
    if (newPopover) {
      const targetId = e.target.value;
      let subject = {};
      switch (e.target.name) {
        case 'cWay':
          subject = cWays.find(({ id }) => id === targetId);
          break;
        case 'size':
          subject = sizes.find(({ id }) => id === targetId);
          break;
        case 'mtrl':
          subject = mtrls.find(({ id }) => id === targetId);
          break;
        default:
          subject = { key: 'no target id' };
      }

      dispatch({ type: CURRENT_ADD, payload: subject });
    } else {
      dispatch({ type: CURRENT_DELETE });
    }
  };

  // Add NewCase to database - Submit form
  const uploadNewCase = async (cases) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/case/user/newcase', cases, config);
      console.log('Upload succeed!');
      dispatch({ type: CASE_DOWNLOAD, payload: res.data });
    } catch (err) {
      console.log('Upload new case faild, server problems');
    }
  };

  return (
    <CasesContext.Provider
      value={{
        user: state.user,
        company: state.company,
        style: state.style,
        client: state.client,
        cWays: state.cWays,
        sizes: state.sizes,
        gQtys: state.gQtys,
        mtrls: state.mtrls,
        popover: state.popover,
        current: state.current,
        formIsHalfFilledOut: state.formIsHalfFilledOut,
        addCaseValue,
        addcWay,
        updatecWay,
        deletecWay,
        addSize,
        updateSize,
        deleteSize,
        addMtrl,
        deleteMtrl,
        expandMtrlColor,
        expandSizeSPEC,
        expandMtrlCspt,
        addValueMtrlColor,
        addValueMtrlSizeSPEC,
        addValueMtrlCspt,
        addMtrlValue,
        togglePopover,
        uploadNewCase,
      }}
    >
      {props.children}
    </CasesContext.Provider>
  );
};

export default CasesState;
