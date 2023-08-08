const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 4000
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv').config()
const colors = require("colors");
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')

connectDB()

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb' }));

const { Server } = require("socket.io");
const { log } = require('console');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true
  }
});


/* all other stuff */

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/message', require('./routes/messageRoutes'))
app.use('/api/groups', require('./routes/groupRoutes'))

app.all("*", (req, res) => {
  res.status(404);
  throw new Error("Route Not Found");
});

// global.onlineUsers = new Map();
global.currentUsers = {}
io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);

  socket.on('addUser', (userId) => {
    // onlineUsers.set(userId, socket.id)
    currentUsers[userId] = socket.id

  })
  socket.on('sendMsg', ({ text, recieverId }) => {
    // const recieverSocketId = onlineUsers.get(recieverd)
    // log(currentUsers,recieverId)
    const recieverSocketId = currentUsers[recieverId]
    if (recieverSocketId) {
      socket.to(recieverSocketId).emit('recieveMsg', { message: { text } });
    }
  })

});

app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});