const socketIo = require("socket.io");
const User = require('./models/user')
const Conversation = require('./models/conversation')

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const user_id = socket.handshake.query["user_id"]
    console.log(`user ${user_id} connected.`);

    // Connection event
    socket.on("connectStatus", async () => {
      try {
        await User.findByIdAndUpdate(user_id, {
          $push: { sockets: socket.id },
          status: "Online"
        })
      } catch (error) {
        console.log(error)
      }
    })

    // Typing event
    socket.on("typing", async (conversation_id, senderName, receiver_id) => {
      try {
        const receiver = await User.findById(receiver_id);
        receiver?.sockets?.forEach(socket => io.to(socket).emit("typing", senderName, conversation_id));
      } catch (error) {
        console.log(error)
      }
    })

    // Send message event
    socket.on("sendMessage", async (user_id, receiver_id, conversation_id, text) => {
      try {
        const receiver = await User.findById(receiver_id);
        const sender = await User.findById(user_id)
        const message = { to: receiver_id, from: user_id, created_at: new Date().toISOString(), text }
        await Conversation.findByIdAndUpdate(conversation_id, {
          $push: { messages: message }
        })
        receiver?.sockets?.forEach(socket => io.to(socket).emit("getMessage", message, conversation_id));
        sender?.sockets?.forEach(socket => io.to(socket).emit("getMessage", message, conversation_id));
      } catch (error) {
        console.log(error)
        io.to(socket.id).emit("errorSendMessage", message, error);
      }
    });

    // Disconnect event
    socket.on("disconnect", async () => {
      try {
        const user = await User.findById(user_id)
        user.sockets.pull(socket.id);
        if (user.sockets.length === 0) {
          user.status = "Offline";
        }
        await user.save();
        console.log(`user ${user_id} disconnected.`)
      } catch (error) {
        console.log(error)
      }
    })

  });
};

module.exports = initializeSocket;