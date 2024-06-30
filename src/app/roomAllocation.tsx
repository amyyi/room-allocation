import { Box, Texts, Room } from '@/components'
import { getDefaultRoomAllocation } from '@/lib/shared'
import { Guest, Rooms, RoomsAssignment } from '@/lib/types'
import { FC, useEffect, useMemo, useState } from 'react'

interface RoomAllocationProps {
  guest: Guest;
  rooms: Rooms;
  onChange: (result: RoomsAssignment[]) => void;
}

export const RoomAllocation: FC<RoomAllocationProps> = ({
  guest,
  rooms,
  onChange,
}) => {
  const { adult, child } = guest;
  const [result, setResult] = useState<RoomsAssignment[]>(
    getDefaultRoomAllocation(guest, rooms)
  );

  const total = useMemo(() => {
    return result.reduce(
      (all, current) => {
        return {
          adults: all.adults + current.adults,
          children: all.children + current.children,
        }
      },
      { adults: 0, children: 0 }
    )
  }, [result])

  const remaining = useMemo(() => {
    return {
      adults: adult - total.adults,
      children: child - total.children,
    }
  }, [total.adults, total.children, adult, child]);

  const handleChange = (
    idx: number,
    key: 'adults' | 'children',
    value: number
  ) => {
    setResult((prev) => {
      const current = [...prev]
      current[idx] = { ...prev[idx], [key]: value }
      return current
    })
  }

  useEffect(() => {
    onChange(result)
  }, [result, onChange])

  return (
    <Box>
      <Texts.H2 mt="20px">
        住客人數：{adult} 位大人， {child} 位小孩 / {rooms.length} 房
      </Texts.H2>
      <Box my="16px" px="16px" py="8px" bg="#f0faff">
        <Texts.Body3 color="gray.3">
          尚未分配人數：{remaining.adults} 位大人，{remaining.children} 位小孩
        </Texts.Body3>
      </Box>
      {result.map((room, idx) => {
        return (
          <Room
            key={`${idx}`}
            idx={idx}
            room={room}
            handleChange={handleChange}
            remaining={remaining}
          />
        )
      })}
    </Box>
  )
}
