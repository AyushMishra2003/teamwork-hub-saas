import { createServer } from 'http'
import { Server } from 'socket.io'
import app from './app.js'
import ConnectionToDB from './config/dbConnection.js'

const PORT = process.env.PORT || 5500

// HTTP server banate hain Express app ke liye
const httpServer = createServer(app)

// Socket.io initialize
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})


const onlineUsers = new Map();
const rooms = []

// Socket connection handle karna
io.on('connection', (socket) => {
  // console.log('New client connected:', socket.id)

  // jab bhi naya client connect hoga, yeh sab connected ids dikhayega
  // const connectedSockets = Array.from(io.sockets.sockets.keys());
  // console.log("All Connected Socket IDs:", connectedSockets);

  // io.emit("all-user", connectedSockets)

  // on and emit 

  socket.emit("test", { "demo": "ayush Ji" })


  socket.on("frontoServer", (message) => {
    console.log("message from frontend is", message);
  })




  // chat functionality
  socket.on("make-connection", (data) => {
    onlineUsers.set(data.user, socket.id);
    console.log("he", onlineUsers);
    io.emit("online", { onlineUsers: Array.from(onlineUsers.keys()) });
  })

  // console.log("onlie user",onlineUsers);

  socket.on("private-message", ({ privateMessage, selectedUser, user }) => {
    console.log("message is", privateMessage, selectedUser);
    const toUser = onlineUsers.get(selectedUser)

    io.to(toUser).emit("send-private-message", {
      from: user,
      message: privateMessage
    })

  })


  io.emit("online", { onlineUsers })


  socket.on("request-send", ({ to: email, from }) => {
    console.log("requesrt is", email, from);

    const toUser = onlineUsers.get(email)

    io.to(toUser).emit("send-request", {
      from: from,
      message: "ayush don"
    })
  })



  socket.on("send-group-message", ({ groupName, user, message }) => {
    
  
    
    console.log("group message is", groupName, user, message);
  
    socket.join(groupName);

    io.to(groupName).emit("groupRoomMessage", {
      from: user,
      message: `${user} has message ${groupName}`
    });


  })



  // listen for private message request
  socket.on("privateMesage", ({ to, message }) => {
    console.log("aaya mia", to, message);

    io.to(to).emit("privateMessage", {
      from: socket.id,
      message
    })

  })


  socket.on("create-group", ({ groupName, user }) => {

    socket.join(groupName);

    if (!rooms.includes(groupName)) {
      rooms.push(groupName)
    }

    // Notify the user that they have joined 

    io.to(groupName).emit("groupRoomMessage", {
      from: "admin",
      message: `${user} has joined the group ${groupName}`
    });

    io.emit("all-group", rooms)


  })


  socket.emit("test1", { "ayush": "mishra ji" })






  io.emit("all-group", rooms)


  socket.broadcast.emit("test2", { ayush: "hello baby how are you i am broadcast" });

  // Client sends message to room
  socket.on("sendMessage", ({ roomName, message }) => {
    // Send to all in room (including sender)
    io.to(roomName).emit("roomMessage", {
      from: socket.id,
      message,
    });
  });



  // Send updated online list to everyone
  io.emit("onlineUsers", Array.from(io.sockets.sockets.keys()));


  // for Room Joining
  socket.on("joinRoom", ({groupName}) => {


   socket.join(groupName);



  });



  // Client se message receive karna
  // socket.on('send_message', (data) => {

  //   // Broadcast to all other clients
  //   socket.broadcast.emit('receive_message', data)
  // })

  // Disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
    // const updatedSockets = Array.from(io.sockets.sockets.keys());
    // console.log("Now Connected:", updatedSockets);
    // remove email by socketId
    for (let [email, id] of onlineUsers.entries()) {
      if (id === socket.id) {
        onlineUsers.delete(email);
        console.log(email, "removed from online users");
        break;
      }
    }

    io.emit("online", { onlineUsers: Array.from(onlineUsers.keys()) });

  })
})

// DB connection + server start
const startServer = async () => {
  try {
    await ConnectionToDB()
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('DB connection failed', err)
    process.exit(1)
  }
}

startServer()
