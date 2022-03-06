import React, { useEffect, useState, useRef} from 'react'
import { exportuser } from './Home'
import ScrollBottom from 'react-scroll-to-bottom'
import socketIo from 'socket.io-client'

function Chat() {
  const [messages,setMessages]=useState([])
  const [message,setMessage]=useState('')
  const [id,setId]=useState('')
  const refmessages=useRef(messages)

  function sendMessage(){
    socket.emit('messagesend',{user:exportuser,id:id,message:message})
    setMessage('')
  }

  const socket=socketIo(process.env.REACT_APP_SERVER,{cors: {
    origin: process.env.REACT_APP_SERVER,
    credentials: true
  },transports:['websocket']})

  useEffect(()=>{
    socket.on('connect',()=>{
      setId(socket.id)
      socket.emit('join',{exportuser})
    })
    socket.on('welcome',({message})=>{
      setMessages([...refmessages.current,{user:"Admin",side:"left",message:message}])
      refmessages.current=[...refmessages.current,{user:"Admin",side:"left",message:message}]
    })
    socket.on('userjoined',({message})=>{
      setMessages([...refmessages.current,{user:"Admin",side:"left",message:message}])
      refmessages.current=[...refmessages.current,{user:"Admin",side:"left",message:message}]
    })
    socket.on('userleft',({message})=>{
      if(!message.startsWith("undefined")){
        setMessages([...refmessages.current,{user:"Admin",side:"left",message:message}])
        refmessages.current=[...refmessages.current,{user:"Admin",side:"left",message:message}]
      }
    })

    socket.on('message',(data)=>{
      if(socket.id==data.id){
        setMessages([...refmessages.current,{user:"You",side:"right",message:data.message}])
        refmessages.current=[...refmessages.current,{user:"You",side:"right",message:data.message}]
      }
      else{
        setMessages([...refmessages.current,{user:data.user,side:"left",message:data.message}])
        refmessages.current=[...refmessages.current,{user:data.user,side:"left",message:data.message}]
      }
  })

    return ()=>{
      socket.emit('disconnect')
      socket.off()
    }
      
  },[])

  return (
    <>
      <div>
      <div ></div>
      <div style={{width:"300px",height:"300px",border:"2px solid black"}}>
      {console.log(messages)}{
          messages.map((data)=>{
            return (
              <div>{data.user}:{data.message}</div>
            )
          })
        }
      </div>
      <div >
      <input  value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" placeholder='Type your message here'/>
        <button onClick={sendMessage}>SEND</button>
      </div>
      </div>
    </>
  )
}

export default Chat