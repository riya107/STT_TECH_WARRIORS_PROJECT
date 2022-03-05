const http=require("http")
const express=require("express")
const cors=require("cors")
const socketIo=require("socket.io")

const app=express()

const server=http.createServer(app)

const io=socketIo(server)

let users={}

io.on('connection',(socket)=>{
    console.log('New Connection')
    socket.on('join',({exportuser})=>{
        users[socket.id]=exportuser
        socket.emit('welcome',{message:`welcome to the chat ${exportuser}`})
        socket.broadcast.emit('userjoined',{message:`${exportuser} has joined the chat`})
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('userleft',{message:`${users[socket.id]} has left the chat`})
    })

    socket.on('messagesend',(data)=>{
        io.emit('message',data)
    })
})

server.listen(process.env.PORT || 80,()=>{
    console.log(`connected to port ${process.env.PORT || 80}`)
})