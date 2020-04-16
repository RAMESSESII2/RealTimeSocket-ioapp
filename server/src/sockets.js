const socketIO = require('socket.io');
const app=require("./app");

function init(server){
    const io=socketIO(server);
    console.log("Sockets server is listening for connections");

    io.on('connection', socket=>{
        io.emit('message-client-connected',socket.id);
        socket.on('mousemove', event=>{
            //console.log(event);
            event.id=socket.id;
            io.emit('mousemove', event);

        });
        socket.on('disconnect', event =>{
            io.emit('messsage-client-disconnected', socket.id);
        });
        });

};
module.exports={
    init
};