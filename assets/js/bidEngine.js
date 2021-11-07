var logContainer=$('.logs')
var curr_bid_value=$("#curr_bid_value");
// console.log("hello in bid")
class BidEngine{ 
    constructor(bidRoomId,userEmail,username)
    {
        this.bidRoomId=bidRoomId;
        this.userEmail=userEmail;
        this.username=username;

        this.socket=io.connect('http://localhost:80');
        console.log(this.userEmail)
        if(this.userEmail)
        {
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self=this;

        console.log("hello in cH");
        this.socket.on('connect',function(){
            // i am sending a connection request to the server
            console.log("Connection Established using sockets");

        })

        self.socket.emit('online',{
            bidRoom:self.bidRoomId,
            user_name:self.username,
            user_email:self.userEmail
        })

        self.socket.on("user_joined",function(data){
            if(data.user_email==self.userEmail)
                logContainer.append(`<li> YOU&nbsp;&nbsp;JOINED </li>`)
            else
                logContainer.append(`<li> ${data.user_name}&nbsp;&nbsp;JOINED </li>`)
        })
        
        $('#bid_button').click(function(e){
            e.preventDefault();
            // console.log(e);
            let bidValue=$('#bid_input')[0].value;
            console.log(bidValue);

            // now i can peacefully make an ajax request

            $.ajax({
                url:`/bidraise?bidId=${self.bidRoomId}`,
                type:"POST",
                data:{value:bidValue},
                success:function(data){
                    console.log(data);
                    // console.log(curr_bid_value);
                    
                    // so the curr_user rn is the highest bidder
                    self.socket.emit('placedbid',{
                        user_name:self.username,
                        user_email:self.userEmail,
                        value:bidValue,
                        room:self.bidRoomId
                    })

                    self.socket.on("bidded",function(data){
                        if(data.user_email==self.userEmail)
                            logContainer.append(`<li> YOU&nbsp;&nbsp;BIDDED </li>`)
                        else
                            logContainer.append(`<li> ${data.user_name}&nbsp;&nbsp;BIDDED</li>`)
                        
                        curr_bid_value[0].innerText=`${data.value}`

                    })
                }
            })

        })

    }
};