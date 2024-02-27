
import  express  from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 5173;
const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', (server) => {
    console.log('a user connected');
    console.log(server.id); 
    server.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
