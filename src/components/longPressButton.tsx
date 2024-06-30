import { FC, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Texts } from './text'

const StyledBtn = styled.button`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 4px;
  font-size: 24px;
  font-weight: 500;
  border: 1px solid rgb(30, 159, 210);
  color: rgb(30, 159, 210);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }
`

interface LongPressButtonProps {
  type: 'minus' | 'plus'
  disabled: boolean
  value: number
  min: number
  max: number
  onValueChange: ((text: number) => void)
}

export const LongPressButton: FC<LongPressButtonProps> = ({
  type,
  disabled,
  value,
  min,
  max,
  onValueChange
}) => {
  const isMinus = type === 'minus';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startIncrement = useCallback(() => {
    pressTimerRef.current = setTimeout(()=> {
      isMinus && onValueChange(Math.max(min, value - 1))
      !isMinus && onValueChange(Math.min(max, value + 1))
    }, 500)
  }, [isMinus, max, min, onValueChange, value])

  const stopIncrement = useCallback(() => {
    if (pressTimerRef.current) {
      clearInterval(pressTimerRef.current)
    }
  }, [])

  return (
    <StyledBtn
      ref={buttonRef}
      disabled={disabled}
      onMouseDown={startIncrement}
      onMouseUp={stopIncrement}
      onMouseLeave={stopIncrement}
      onTouchStart={startIncrement}
      onTouchEnd={stopIncrement}
    >
      <Texts.Body2 color="#1e9fd2"> {isMinus ? '-' : '+'}</Texts.Body2>
    </StyledBtn>
  )
}
