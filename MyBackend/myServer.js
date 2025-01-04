// importing packages
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
//importing db config
const connectDB = require('./dbConfig/dbConfig');
//importing routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/docRoute');
const { Server } = require('socket.io');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Configure CORS for HTTP requests
//CORS - cross origin resource sharing
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST','PUT','DELETE']
    }
});

// Middleware and routes
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

//connection happens when a io called made from socket.io client
io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    //user on documentdetails - useuseffect
    socket.on('joinDocument', (documentId) => {
        socket.join(documentId);
        console.log(`User joined document ${documentId}`);
    });
    // user when changes the input feild values
    socket.on('documentUpdate', ({ documentId, title, content }) => {
        socket.to(documentId).emit('receiveUpdate', { title, content });
    });

    //this is not used by the frontend
    socket.on('sendMessage', ({ documentId, message }) => {
        socket.to(documentId).emit('receiveMessage', message);
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});