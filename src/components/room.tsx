import { FC, useRef } from 'react'
import { Texts } from './text'
import { Box } from './box'
import { Input } from './input'
import { LongPressButton } from './longPressButton'
import { RoomsAssignment } from '@/lib/types'

interface FieldProps {
  idx: number
  title: string
  note?: string
  max: number
  min: number
  value: number
  type: 'adults' | 'children';
  handleChange: (
    idx: number,
    key: 'adults' | 'children',
    value: number
  ) => void
}

const CustomInputNumber: FC<FieldProps> = ({
  idx,
  title,
  note,
  max,
  min,
  value,
  handleChange,
  type,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnChange = (value: number) => {
    handleChange(idx, type, value);
  };

  return (
    <Box row justifyContent="space-between">
      <Box>
        <Texts.Body2>{title}</Texts.Body2>
        {!!note && (
          <Texts.Body3 mb="16px" color="gray.3">
            {note}
          </Texts.Body3>
        )}
      </Box>
      <Box row>
        <LongPressButton
          type="minus"
          max={max}
          min={min}
          value={inputRef.current?.valueAsNumber || 0}
          onValueChange={handleOnChange}
          disabled={value <= min}
        />
        <Input
          type="number"
          inputMode="numeric"
          value={value}
          onValueChange={handleOnChange}
          ref={inputRef}
        />
        <LongPressButton
          type="plus"
          max={max}
          min={min}
          value={inputRef.current?.valueAsNumber || 0}
          onValueChange={handleOnChange}
          disabled={value >= max}
        />
      </Box>
    </Box>
  );
};

interface RoomProps {
  idx: number
  handleChange: (
    idx: number,
    key: 'adults' | 'children',
    value: number
  ) => void
  room: RoomsAssignment
  remaining: {
    adults: number
    children: number
  }
}
export const Room: FC<RoomProps> = ({ idx, room, handleChange, remaining }) => {
  const totalPeople = room.adults + room.children;

  return (
    <Box px="16px" pt="12px" my="12px" borderTop={`1px solid #e8e8e8`}>
      <Texts.Body1 mb="16px">房間：{totalPeople} 人</Texts.Body1>
      <CustomInputNumber
        idx={idx}
        type="adults"
        title="大人"
        note="年齡 20+"
        min={1}
        max={Math.min(room.room.capacity, room.adults + remaining.adults)}
        value={room.adults}
        handleChange={handleChange}
      />
      <CustomInputNumber
        idx={idx}
        type="children"
        title="小孩"
        min={0}
        max={Math.min(room.room.capacity, room.children + remaining.children)}
        value={room.children}
        handleChange={handleChange}
      />
    </Box>
  );
};
