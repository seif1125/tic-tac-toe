import React, { forwardRef } from 'react';

const Status = forwardRef(({ status }, ref) => {
  return (
    <div className='status-container'>
      <span ref={ref}>{status}</span>
    </div>
  );
});

export default Status;