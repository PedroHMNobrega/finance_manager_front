import React from 'react'

type Props = {
  width: number
}

const Space: React.FC<Props> = ({ width }: Props) => {
  return (
    <div style={{ width: width }}></div>
  )
}

export default Space
