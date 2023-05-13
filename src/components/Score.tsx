import React from 'react';

function Score({ score }: { score: number }) {
  return (
    <div className='score'>
      <div>
        <div className='score__value'>{score.toString().padStart(2, '0')}</div>
        <div className='score__player'>player 1</div>
      </div>
      <div>
        <div className='score__value'>00</div>
        <div className='score__player'>player 2</div>
      </div>
    </div>
  );
}

export default Score;
