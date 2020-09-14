import React, { useContext } from 'react';

// Components
import LeftBar from '../layout/LeftBar';
// ItemSelector
import ItemSelector from '../itemSelector/ItemSelector';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';

export const MPrice = (props) => {
  const srMtrlContext = useContext(SrMtrlContext);
  const currentPath = props.location.pathname;
  const { srMtrls, updateMPrices, updateMPricesQuotation } = srMtrlContext;

  const onSubmitSrMtrl = async (e) => {
    console.log('yes the submit is hit');
    e.preventDefault();
    const body = [];
    await srMtrls.map((srMtrl) => {
      body.push({
        id: srMtrl._id,
        mainPrice: srMtrl.mainPrice,
        mPrices: srMtrl.mPrices,
      });
    });
    if (currentPath === '/api/case/mprice') {
      updateMPrices(body);
    }
  };

  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar currentPath={currentPath} />

      {/* Grid-2 */}
      <form id='srMtrlForm' onSubmit={onSubmitSrMtrl}>
        {' '}
        <ItemSelector
          purpose='srMtrlSelector'
          props={props}
          currentPath={currentPath}
        />
      </form>
    </div>
  );
};

export default MPrice;
