import React, { useEffect, useState, useRef} from 'react'
import { exportuser } from './Home'
import socketIo from 'socket.io-client'
import '../styles/Chat.css'
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import ScrollBottom from 'react-scroll-to-bottom'

function Chat() {
  const [messages,setMessages]=useState([])
  const [message,setMessage]=useState('')
  const [id,setId]=useState('')
  const refmessages=useRef(messages)

  function sendMessage(){
    if(message.length==0){
      alert("Empty message is not allowed")
    }
    else{
      socket.emit('messagesend',{user:exportuser,id:id,message:message})
      setMessage('')
    }
  }
 
  const socket=socketIo(process.env.REACT_APP_SERVER,{cors: {
    origin: process.env.REACT_APP_SERVER,
    credentials: true
  },transports:['websocket']})

  useEffect(()=>{
    socket.on('connect',()=>{
      console.log("connected")
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
      <div className='container'>
      <div className="header">HiHello-Tech Warriors</div>
      <ScrollBottom className="chatBox">{
          messages.map((data)=>{
            return <Message user={data.user} side={data.side} message={data.message}/>
          })
        }
      </ScrollBottom>
      <div className="inputBox">
      <input className='message' value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" placeholder='Type your message here'/>
        <button className='send' onClick={sendMessage}><SendIcon className={'sendIcon'} fontSize='small'/></button>
      </div>
      </div>
    </>
  )
}

export default Chat