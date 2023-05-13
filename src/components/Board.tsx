import React, { useCallback } from 'react';

import Hit from './../assets/Hit.png';
import Miss from './../assets/Miss.png';
import { ShipTypes } from '../types';

enum BoardItemState {
  HIT = 'hit',
  MISS = 'miss',
  EMPTY = 'empty',
  CARRIER = 'carrier',
  BATTLESHIP = 'battleship',
  CRUISER = 'cruiser',
  SUBMARINE = 'submarine',
  DESTROYER = 'destroyer'
}

interface IBoard {
  board: BoardItemState[][];
  setBoard: React.Dispatch<React.SetStateAction<BoardItemState[][]>>;
  setCounter: React.Dispatch<React.SetStateAction<{[key in ShipTypes]: number}>>
}

function Board({ board, setBoard, setCounter }: IBoard) {
  const getImg = useCallback((key: BoardItemState) => {
    switch (key) {
      case BoardItemState.MISS:
        return Miss
      case BoardItemState.HIT:
        return Hit
      default:
        return ''
    }
  }, [])

  const playTurn = useCallback((idx: number) => {
    const row = Math.floor(idx/10);
    const column = idx - (row*10);
    const boardItem = board[row][column];

    setBoard((currBoard) => {
      const copy = [...currBoard.map((item) => [...item])];
      if ( [
        BoardItemState.HIT,
        BoardItemState.MISS,
      ].includes(boardItem)) {
        return copy;
      }
      
      if (
        [
          BoardItemState.CARRIER,
          BoardItemState.BATTLESHIP,
          BoardItemState.CRUISER,
          BoardItemState.SUBMARINE,
          BoardItemState.DESTROYER
        ].includes(boardItem)
      ) {
        copy[row][column] = BoardItemState.HIT;
      } else {
        copy[row][column] = BoardItemState.MISS;
      }
      return copy;
    })

    if (
      [
        BoardItemState.CARRIER,
        BoardItemState.BATTLESHIP,
        BoardItemState.CRUISER,
        BoardItemState.SUBMARINE,
        BoardItemState.DESTROYER
      ].includes(boardItem)
    ) {
      setCounter((currCounter) => {
        return {
          ...currCounter,
          [boardItem]: currCounter[boardItem as ShipTypes]+1
        }
      })
    }
  }, [board])

  return (
    <div className='board'>
      {
        board.flat().map(
          (value, idx) => (
            <div className="board__item" onClick={() => playTurn(idx)} key={`board-item-${idx}`}>
              { [BoardItemState.HIT, BoardItemState.MISS].includes(value) &&
                <img alt={value.toString()} src={getImg(value)} /> }
            </div>
          )
        )
      }
    </div>
  );
}

export default Board;
