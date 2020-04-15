const socketIO = require('socket.io');
const app=require("./app");

function init(server){
    const io=socketIO(server);
    console.log("Sockets server is listening for connections");

    io.on('connection', socket=>{
        io.emit('message-client-connected',`Client with id ${socket.id} was connected`);
    });

};
module.exports={
    init
};