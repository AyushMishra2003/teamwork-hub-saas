import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'

// Connect to server
const socket = io('http://localhost:5000')

function Chat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [onlineUser, setOnlineUser] = useState([])


  useEffect(() => {

    socket.on('connection', () => {
      console.log("connection");
    })


   




    return () => {
      socket.off('disconnect')
    }
  }, [])


  const handleClick = () => {
    socket.emit("frontoServer", { "server": "hyy server how are you" })
  }

  const sendMessageToRoom = () => {
    // send message
    socket.emit("sendMessage", { roomName: "room1", message: "Hello everyone!" });
  }

  const sendMessage = () => {
    if (!message.trim()) return
    socket.emit('send_message', message)
    setChat(prev => [...prev, `You: ${message}`])
    setMessage('')
  }

  const handlePrivateMessage = () => {
    socket.emit("privateMesage", {
      to: "gOSYyTYcLnuPnQm8AAAl",
      message: "hello bhai how are you"
    });
  }


  console.log("all-user is", onlineUser);


  return (
    <div className="p-4">
      <h1>All User:-</h1>
      {onlineUser.map((val, index) => {
        return (
          <li>
            Link is- {val}
          </li>
        )
      })}

      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {chat.map((msg, idx) => <div key={idx}>{msg}</div>)}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2 w-full"
      >
        Send
      </button>


      <button onClick={handleClick} className='px-2 py-2 bg-red-500 '>
        CLICK ME
      </button>

      <button onClick={sendMessageToRoom} className='px-2 py-2 bg-red-500 '>
        SEND MESSAGE
      </button>

      <button onClick={handlePrivateMessage} className='px-2 py-2 bg-red-500 '>
        private
      </button>


    </div>
  )
}

export default Chat
