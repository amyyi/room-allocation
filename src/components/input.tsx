import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef } from "react"
import { styled } from "styled-components"
import { SpaceProps, space } from "styled-system"

const StyledInput = styled.input`
  ${space};
  align-items: center;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  color: #595959;
  opacity: 1;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  margin: 0 8px;
  line-height: 38px;
  border: 1px solid rgb(191, 191, 191);
  border-radius: 4px;
  appearance: none;
  padding: 0;
`

export interface TextInputProps extends SpaceProps, InputHTMLAttributes<HTMLInputElement> {
  maxLength?: number
  autoTrim?: boolean
  onValueChange?: (text: number) => void
}

const _Input: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = ({
  onValueChange,
  autoTrim,
  maxLength = 20000,
  ...props
}, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      onValueChange(event.target.valueAsNumber)
    }
    if (props.onChange) {
      props.onChange(event)
    }
  }

  return <StyledInput ref={ref} onChange={handleChange} {...props} />
}

export const Input = forwardRef(_Input)
