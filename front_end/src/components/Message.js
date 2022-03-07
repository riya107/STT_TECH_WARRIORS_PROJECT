import React from 'react'
import '../styles/Message.css'

function Message(props) {
  return (
    <>
        <div className={props.side}>
            <div className='user'>{props.user}</div>
            <div className='message'>{props.message}</div>
        </div>
    </>
  )
}

export default Message