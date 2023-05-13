export type ShipTypes = 'carrier' | 'battleship' | 'cruiser' | 'submarine' | 'destroyer';

export type IShipType = {
  [key in ShipTypes]: { size: number; count: number }
}

export interface IShipLayout {
  shipTypes: IShipType;
  layout: { ship: ShipTypes, positions: number[][] }[]
}

export enum BoardItemState {
  HIT = 'hit',
  MISS = 'miss',
  EMPTY = 'empty',
  CARRIER = 'carrier',
  BATTLESHIP = 'battleship',
  CRUISER = 'cruiser',
  SUBMARINE = 'submarine',
  DESTROYER = 'destroyer'
}