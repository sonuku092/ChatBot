
import  express  from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 5173;
const app = express();
const server = createServer(app)
const io = new Server(server);

app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', (server) => {
    console.log('a user connected');
    console.log(server.id);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
