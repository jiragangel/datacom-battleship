import React, { useCallback, useMemo, useState } from 'react';

import HitSmall from './../assets/Hit small.png';
import MissSmall from './../assets/Miss small.png';

import { IShipType, ShipTypes } from '../types';

interface IBattleships {
  shipTypes: IShipType;
  counter: { [key in ShipTypes]: number };
  maxSize: number
}

function Battleships({ shipTypes, counter, maxSize }: IBattleships) {
  const getTrackerIcon = useCallback((shipType: ShipTypes, sunkSize: number, idx: number) => {
    if (idx + 1 > shipTypes[shipType].size) return <span key={`ship-${idx}`} />;
    // ship has been sunk
    if (shipTypes[shipType].size === sunkSize) return <img key={`ship-${idx}`} alt="hit" src={HitSmall} />
    return <img key={`ship-${idx}`} alt="miss" src={MissSmall} />
  }, [shipTypes])

  return (
    <div className='battleships'>
      {
        Object.entries(counter).map(([key, value]) => (
          <div className='ship-details' key={`ship-details-${key}`}>
            <div className='ship-details__icon'><img src={require(`./../assets/${key}.png`)} alt={key} /></div>
            <div className='ship-details__tracker'>
              {
                [...Array(maxSize)].map(
                  (v, idx) => (
                    getTrackerIcon(key as ShipTypes, value, idx)
                  )
                )
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Battleships;
