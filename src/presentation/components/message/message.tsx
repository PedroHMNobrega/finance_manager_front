import React, { useEffect, useState } from 'react'
import Styles from './message-styles.scss'

export enum MessageType {
  ERROR = 'message_error',
  SUCCESS = 'message_success',
  ALERT = 'message_alert'
}

type Props = {
  message: string
  type: MessageType
  duration?: number
}

const Message: React.FC<Props> = ({ message, type, duration = 4000 }: Props) => {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (message !== '') {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, duration)
    }
  }, [message, duration, setShowMessage])

  const render = (): JSX.Element => {
    if (!showMessage) return null

    return (
      <div className={[Styles.message, Styles[type]].join(' ')} data-testid="message">
        <h2 className={Styles.message_text} data-testid="message-text">{message}</h2>
      </div>
    )
  }

  return render()
}

export default Message
