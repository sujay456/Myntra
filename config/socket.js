
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
            console.log("You are entering in the bid room",data);
            
            socket.join(data.bidRoom);

            io.in(data.bidRoom).emit('user_joined',{user_name:data.user_name,user_email:data.user_email});

            
        })

        socket.on("placedbid",function(data){

            io.in(data.room).emit('bidded',data);
        })
    })

   

}