import { Guest, Result, Room, Rooms, RoomsAssignment } from './types'

export const getTotalPrice = ({ adult, child }: Guest, room: Room) => {
  return room.roomPrice + room.adultPrice * adult + room.childPrice * child
}

export const getResult = (roomsAssignment: RoomsAssignment[]): Result => {
  return roomsAssignment.reduce(
    (
      all: Result,
      { adults: adult, children: child, price }: RoomsAssignment
    ): Result => {
      return [
        ...all,
        {
          adult,
          child,
          price,
        },
      ]
    },
    []
  )
}

export const getDefaultRoomAllocation = (people: Guest, rooms: Rooms) => {
  rooms.sort((a, b) => {
    const costPerAdultA = a.adultPrice + a.roomPrice / a.capacity
    const costPerAdultB = b.adultPrice + b.roomPrice / b.capacity
    return costPerAdultA - costPerAdultB
  })

  let remainingAdults = people.adult
  let remainingChildren = people.child
  const assignments: RoomsAssignment[] = []

  // Each room has a adult
  for (const room of rooms) {
    if (remainingAdults === 0) break
    const adultsInRoom = Math.min(remainingAdults, 1)
    assignments.push({ room, adults: adultsInRoom, children: 0, price: 0 })
    remainingAdults -= adultsInRoom
  }

  for (const assignment of assignments) {
    const room = assignment.room
    let adultsInRoom = assignment.adults
    let childrenInRoom = assignment.children

    const remainingCapacity = room.capacity - adultsInRoom

    if (remainingCapacity > 0 && remainingAdults > 0) {
      const additionalAdults = Math.min(remainingCapacity, remainingAdults)
      adultsInRoom += additionalAdults
      remainingAdults -= additionalAdults
    }

    if (remainingCapacity > 0 && remainingChildren > 0) {
      const additionalChildren = Math.min(
        remainingCapacity - (adultsInRoom - assignment.adults),
        remainingChildren
      )
      childrenInRoom += additionalChildren
      remainingChildren -= additionalChildren
    }

    assignment.adults = adultsInRoom
    assignment.children = childrenInRoom
    assignment.price = getTotalPrice(
      { adult: adultsInRoom, child: childrenInRoom },
      room
    )
    assignment.room = room
  }

  if (remainingAdults > 0 || remainingChildren > 0) {
    throw new Error('Can not fulfill.')
  }

  return assignments
}
