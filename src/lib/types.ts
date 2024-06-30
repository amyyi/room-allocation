
export interface Guest {
  adult: number
  child: number
}

export interface Room {
  roomPrice: number
  adultPrice: number
  childPrice: number
  capacity: number
}

export type Rooms = Room []

export interface RoomAssignment {
  adult: number
  child: number
  price: number
}

export type Result = RoomAssignment[]

export interface RoomsAssignment {
  room: Room
  adults: number
  children: number
  price: number
}