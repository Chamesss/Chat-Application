const socketIo = require("socket.io");
const User = require('./models/user')
const Conversation = require('./models/conversation')

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3001',
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const user_id = socket.handshake.query["user_id"]
    console.log(`user ${user_id} connected.`);

    // Connection event
    const setOnline = async () => {
      try {
        await User.findByIdAndUpdate(user_id, {
          $push: { sockets: socket.id },
          status: "Online"
        })
      } catch (error) {
        console.log(error)
      }
    }
    setOnline()

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
        const message = { to: receiver_id, from: user_id, created_at: new Date().toISOString(), text, status: true, seen: { status: false } }
        const updatedConversation = await Conversation.findByIdAndUpdate(
          conversation_id,
          { $push: { messages: message } },
          { new: true }
        );
        const newMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
        receiver?.sockets?.map(socket => io.to(socket).emit("getMessage", newMessage, conversation_id));
        sender?.sockets?.map(socket => io.to(socket).emit("getMessage", newMessage, conversation_id));
      } catch (error) {
        const message = { to: receiver_id, from: user_id, created_at: new Date().toISOString(), text, status: false }
        console.log(error)
        io.to(socket.id).emit("errorSendMessage", message, conversation_id, error);
      }
    });

    socket.on("messageSeen", async (message_id, conversation_id, receiver_id) => {
      try {
        const receiver = await User.findById(receiver_id);
        receiver?.sockets?.map(socket => io.to(socket).emit("MessageSeen", message_id, conversation_id));
      } catch (error) {
        console.log(error)
      }
    })

    socket.on("refresh", async (userId) => {
      try {
        const user = await User.findById(userId)
        user?.sockets?.forEach(socket => io.to(socket).emit("refreshData"));
      } catch (error) {
        console.log(error)
      }
    })

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