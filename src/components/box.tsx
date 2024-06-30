import isPropValid from '@emotion/is-prop-valid'
import { ForwardRefRenderFunction, ReactNode, forwardRef } from 'react'
import styled from 'styled-components'
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  border,
  color,
  flexbox,
  layout,
  position,
  space
} from 'styled-system'

export interface BoxProps
  extends PositionProps,
    LayoutProps,
    FlexboxProps,
    SpaceProps,
    ColorProps,
    BorderProps {
  row?: boolean
  wrap?: boolean
  xalign?: 'flex-start' | 'center' | 'flex-end'
  yalign?: 'flex-start' | 'center' | 'flex-end'
  ratio?: number
  children?: ReactNode
  onClick?(): void
}

const StyledDiv = styled('div').withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<BoxProps>`
  display: flex;
  ${position};
  ${layout};
  ${flexbox};
  ${space};
  ${color};
  ${border};
`

const _Box: ForwardRefRenderFunction<HTMLDivElement, BoxProps> = ({
  row,
  wrap,
  xalign,
  yalign,
  ratio,
  onClick,
  ...rest
}, ref) => {
  const boxProps: BoxProps & { aspectRatio?: number } = {
    flexDirection: row ? 'row' : 'column',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    alignItems: row ? yalign : xalign,
    justifyContent: row ? xalign : yalign,
    aspectRatio: ratio,
    ...rest,
  }

  return <StyledDiv onClick={onClick} ref={ref} {...boxProps} />
}

export const Box = forwardRef(_Box)
