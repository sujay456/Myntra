class BidEngine{
    constructor(bidRoomId,userEmail,username)
    {
        this.userEmail=userEmail;
        this.username=username;

        this.socket=io.connect('http://localhost:5000');
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
            user_name:self.username
        })

        self.socket.on("up",function(data){
            console.log("You are online for bidding",data);
        })
        
        $('.bidding_container').on('click',function(){
            console.log("Clicked");
            self.socket.emit('online',{
                user_name:self.username
            })
        })

    }
};