//THis is the client!!
console.log("Working");
import io from "socket.io-client"

const API_URL=window.location.hostname==='localhost'?"http://localhost:5000" : "https://realtimefun.now.sh"

const socket=io.connect(API_URL);
const mice={};
socket.on("connect", ()=>{
    console.log("Connected to the socket server");
});

// socket.on("message-client-connected",(id)=>{
// //    console.log(message);
// if(socket.id!==id){
    
// };
// });

socket.on("messsage-client-disconnected",(id)=>{
    if(mice[id]){
        document.body.removeChild(mice[id]);
    };
});

socket.on('mousemove',(event)=>{
 //   console.log(socket.id);
    // if(socket.id!==event.id){
        let mouse = mice[event.id];
        if(!mouse){
            const span = document.createElement('span');
            span.style.position='absolute';
            span.textContent='🤷‍♂️';
            mice[event.id] = span;
            mouse=span
            document.body.appendChild(span);
        };
        mouse.style.top= event.y+'px';
        mouse.style.left= event.x+'px';
 //       console.log(event);
    // }
});

document.addEventListener('mousemove', (event)=>{
//    console.log(event);
  //  console.log(event.clientX, event.clientY);
    socket.emit('mousemove', {
        x:event.clientX,
        y:event.clientY
    });
});
