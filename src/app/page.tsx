'use client'

import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import { RoomAllocation } from './roomAllocation'
import { Result, RoomsAssignment } from '@/lib/types'
import { getTotalPrice } from '@/lib/shared'

const guest = { adult: 7, child: 3 }
const rooms = [
  { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
  { roomPrice: 500, adultPrice: 500, childPrice: 300, capacity: 4 },
  { roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
  { roomPrice: 500, adultPrice: 1000, childPrice: 600, capacity: 2 },
]

export default function Home() {
  const handleResult = (rooms: RoomsAssignment[]) => {
    const result: Result = rooms.reduce((all, current) => {
      const {adults: adult, children: child, room} = current
      return [...all, {
        adult,
        child,
        price: getTotalPrice({adult, child}, room)
      }]
    }, [] as Result)
  }

  return (
    <main>
      <ThemeProvider theme={theme}>
        <RoomAllocation guest={guest} rooms={rooms} onChange={handleResult} />
      </ThemeProvider>
    </main>
  )
}
