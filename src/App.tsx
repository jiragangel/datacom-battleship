import React, { useMemo, useState } from 'react';

import './App.css';
import Score from './components/Score';
import { BoardItemState, IShipLayout, ShipTypes } from './types';
import Battleships from './components/Battleships';
import Board from './components/Board';

function App() {
  const shipLayout: IShipLayout = useMemo(() => ({
    "shipTypes": {
        "carrier": { "size": 5, "count": 1 },
        "battleship": { "size": 4, "count": 1 },
        "cruiser": { "size": 3, "count": 1 },
        "submarine": { "size": 3, "count": 1 },
        "destroyer": { "size": 2, "count": 1 }
    },
    "layout": [
        { "ship": "carrier", "positions": [[2,9], [3,9], [4,9], [5,9], [6,9]] },
        { "ship": "battleship", "positions": [[5,2], [5,3], [5,4], [5,5]] },
        { "ship": "cruiser", "positions": [[8,1], [8,2], [8,3]] },
        { "ship": "submarine", "positions": [[3,0], [3,1], [3,2]] },
        { "ship": "destroyer", "positions": [[0,0], [1,0]] }
    ]
  }), [])
  const [board, setBoard] = useState(() => {
    const initial = [...Array(10)].map(() => [...Array(10)].map(() => BoardItemState.EMPTY));

    shipLayout.layout.forEach(({ ship, positions }) => {
      positions.forEach(([x, y]) => {
        initial[y][x] = ship as BoardItemState;
      })
    })
    return initial
  })
  const [counter, setCounter] = useState(() => Object.keys(shipLayout.shipTypes).reduce((acc, shipType) => {
    acc[shipType as ShipTypes] = 0;
    return acc;
  }, {} as {[key in ShipTypes]: number}));
  const score = useMemo(
    () => Object.entries(counter)
      .reduce(
        (acc, [key, value]) => {
          if (value === shipLayout.shipTypes[key as ShipTypes].size) {
            return acc + 1
          }
          return acc;
        }, 0),
    [counter, shipLayout.shipTypes]
  );
  const maxSize = useMemo(() => Object.entries(shipLayout.shipTypes).reduce((max, [, {size}]) => {
      if (size > max) return size;
      return max;
    }, -1), [shipLayout.shipTypes])

  return (
    <div className="App">
      <Score score={score}/>
      <Battleships shipTypes={shipLayout.shipTypes} counter={counter} maxSize={maxSize} />
      <Board board={board} setBoard={setBoard} setCounter={setCounter} />
    </div>
  );
}

export default App;
