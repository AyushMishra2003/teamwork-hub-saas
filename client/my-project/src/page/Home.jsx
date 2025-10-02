import React from "react";
import { use } from "react";
import { useState } from "react";
import { useEffect } from "react";

import { io } from 'socket.io-client'

// Connect to server
const socket = io('http://localhost:5000')


const Home = ({ user, onLogout }) => {



  const [onlineUser, setOnlineUser] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [privateMessage, setPrivateMessage] = useState("")
  const [allPrivateMessage, setAllPrivateMessage] = useState([])
  const [groupName, setGroupName] = useState("")

  const [allGroup, setAllGroup] = useState([])

  useEffect(() => {

    socket.on('connection', () => {
      console.log("connection");

    })

    socket.emit("make-connection", { user })

    socket.on("online", (data) => {
      console.log("online user", data.onlineUsers);
      setOnlineUser(data.onlineUsers)

    })


    socket.on("all-group", (data) => {
      console.log("all group are", data);
      setAllGroup(data);

    })


    socket.on("send-request", (data) => {
      console.log("online user", data);

      alert("aa gaya mai re baba")

    })

    socket.on('groupRoomMessage', (data) => {
      console.log("group message is", data);
      alert(`New message in group: ${data.message}`)


    })



    socket.on("send-private-message", (data) => {
      console.log("online user 123", data);
      // alert("aa gaya mai re baba 123")
      setSelectedUser(data?.from)

      console.log("msg is", data?.message);


      setAllPrivateMessage((prevMessages) => [...prevMessages, data?.message]);



    })




    return () => {
      socket.off('disconnect')
    }
  }, [])


  useEffect(() => {
    console.log("all private message updated:", allPrivateMessage);
  }, [allPrivateMessage]);



  const handleSendRequest = (to) => {
    setSelectedUser(to)
    socket.emit("request-send", { to, from: user })
  }

  const handleGroupMessage = (groupName) => {

    // Join the group first
    socket.emit("joinRoom",{groupName});
    

    socket.emit("send-group-message", {
      groupName: groupName,
      user: user,
      message: `Hi, I am user ${user.name}`
    });
  };

  const handleSendPrivateMessage = () => {
    socket.emit("private-message", { privateMessage, selectedUser, user })
  }



  const handleCreateGroup = () => {

    socket.emit("create-group", { groupName, user })
  }








  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user} 👋
      </h1>


      <div>


        <div>
          <p>All Group :-</p>
          {allGroup && Array.isArray(allGroup) && allGroup.map((val, index) => {
            return (
              <div>

                <p className="cursor-pointer" onClick={() => handleGroupMessage(val)}>-{val}</p>

              </div>
            )
          })}
        </div>
      </div>


      <div className="flex  items-start gap-10 justify-between">

        <div>
          <p>Online User:-</p>
          {onlineUser && Array.isArray(onlineUser) && onlineUser.map((val, index) => {
            return (
              <div>

                <p className="cursor-pointer" onClick={() => handleSendRequest(val)}>User:-{val}</p>

              </div>
            )
          })}
        </div>

        {selectedUser &&
          <div className="mr-20 border border-red-500 px-20">
            <p>Private Chat Open for {selectedUser} </p>

            <div className="py-10">
              <p>Message are:-</p>
            </div>

            <div>
              <input placeholder="Enter Private Message" onChange={(e) => setPrivateMessage(e.target.value)} />
              <button onClick={() => handleSendPrivateMessage(privateMessage)}>SEND</button>
            </div>

            <div className="flex items-center gap-2 justify-between">
              <p>Message is:-</p>

              {allPrivateMessage.map((val, index) => {
                return (
                  <div className="flex items-center" key={index + 1}>
                    <p>{val}</p>
                  </div>
                )
              })}

            </div>

          </div>
        }


      </div>


      <div className="flex flex-col gap-4 ">
        <input placeholder="Enter Group Name" onChange={(e) => setGroupName(e.target.value)} />

        <button onClick={handleCreateGroup}>Create Group</button>

      </div>



      <button
        onClick={onLogout}
        className="px-4 py-2 mt-10  bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
