import React, { CSSProperties } from 'react'
import Styles from './spinner-styles.scss'

export enum SpinnerSize {
  BIG = 1,
  MEDIUM = 2
}

type Props = {
  className: string
  size?: SpinnerSize
}

type CustomCSSProperties = CSSProperties & { '--size'?: string }

const Spinner: React.FC<Props> = (props: Props) => {
  const size = props.size ? props.size : SpinnerSize.BIG

  const style: CustomCSSProperties = {
    '--size': size.toString()
  }

  return (
    <div
      {...props}
      data-testid="spinner"
      className={[Styles.spinner, props.className].join(' ')}
      style={style}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
