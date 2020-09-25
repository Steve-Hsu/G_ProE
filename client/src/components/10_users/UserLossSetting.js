import React, { useContext } from 'react';
import SqBtnLarge from '../../components/elements/btns/SqBtnLarge';
import UserContext from '../../context/user/userContext';

const UserLossSetting = ({ style }) => {
  const userContext = useContext(UserContext);

  return (
    <div className='round-area bd-light bg-cp-1 mt-1' style={style}>
      <div className='text-primary fs-lead'>Setting loss</div>
      <section id='area1' className='flexBox mb-05'>
        <div className='v-center-content mx-05 ' style={{ flex: '1 1' }}>
          0pcs
        </div>
        <div className='v-center-content mx-05'>
          <span>to</span>
        </div>
        <div className='w-20'>
          <input type='number' />
        </div>
        <div className='v-center-content mx-05'>
          <span>pcs</span>
        </div>
        <div className='v-center-content mx-05'>
          <span>The loss</span>
        </div>
        <div className='w-15'>
          <input type='number' />
        </div>
        <div className='v-center-content mx-05'>
          <span>%</span>
        </div>
      </section>
      <section id='area1' className='flexBox mb-05'>
        <div className='v-center-content mx-05 ' style={{ flex: '1 1' }}>
          0pcs
        </div>
        <div className='v-center-content mx-05'>
          <span>to</span>
        </div>
        <div className='w-20'>
          <input type='number' />
        </div>
        <div className='v-center-content mx-05'>
          <span>pcs</span>
        </div>
        <div className='v-center-content mx-05'>
          <span>The loss</span>
        </div>
        <div className='w-15'>
          <input type='number' />
        </div>
        <div className='v-center-content mx-05'>
          <span>%</span>
        </div>
      </section>
      <section id='area1' className='flexBox mb-05'>
        <div className='v-center-content mx-05 ' style={{ flex: '1 1' }}>
          0pcs
        </div>
        <div className='v-center-content mx-05'>
          <span>to</span>
        </div>
        <div className='w-20'>
          <input type='number' />
        </div>
        <div className='v-center-content mx-05'>
          <span>pcs</span>
        </div>
        <div className='v-center-content mx-05'>
          <span>The loss</span>
        </div>
        <div className='w-15'>
          <input type='number' />
        </div>
        <div className='v-center-content mx-05'>
          <span>%</span>
        </div>
      </section>
      <div className='h-scatter-content'>
        <div></div>
        <SqBtnLarge className='mt-1' />
      </div>
    </div>
  );
};

export default UserLossSetting;
