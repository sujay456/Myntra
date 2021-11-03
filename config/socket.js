
module.exports.bidSocket=function(socketServer)
{
    let io=require('socket.io')(socketServer,{
        cors:{
            origin:'*',
        }
    });

    io.sockets.on('connection',function(socket){
        console.log("New connection",socket.id);

        socket.on('disconnect',function(){
            console.log("disconnected");
        })
        
        socket.on("online",function(data){
            console.log("You are online now",data);
            
            socket.emit("up",{
                online:true
            })
        })
    })

   

}