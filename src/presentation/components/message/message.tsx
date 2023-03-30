import React, { useEffect, useState } from 'react'
import Styles from './message-styles.scss'

export enum MessageType {
  ERROR,
  SUCCESS,
  ALERT
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

  const getClass = (): string => {
    switch (type) {
      case MessageType.SUCCESS:
        return Styles.message_success
      case MessageType.ERROR:
        return Styles.message_error
      default:
        return Styles.message_alert
    }
  }

  const render = (): JSX.Element => {
    if (!showMessage) return null

    return (
      <div className={[Styles.message, getClass()].join(' ')} data-testid="message">
        <h2 className={Styles.message_text} data-testid="message-text">{message}</h2>
      </div>
    )
  }

  return render()
}

export default Message
