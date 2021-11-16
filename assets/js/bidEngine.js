var logContainer=$('.logs')
var curr_bid_value=$("#curr_bid_value");
// var Plotly=require('plotly.js-dist-min')
// console.log("hello in bid")
class BidEngine{ 
    constructor(bidRoomId,userEmail,username,curr_bid)
    {
        this.bidRoomId=bidRoomId;
        this.userEmail=userEmail;
        this.username=username;
        
        
        this.socket=io.connect('http://13.232.132.3:4433');
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
        self.socket.on("bidded",function(data){
            $('.dot').toggleClass('red');
            $('.dot').toggleClass('green');
            if(data.user_email==self.userEmail)
            {
                $('.dot').removeClass('red');
                $('.dot').addClass('green');

                logContainer.append(`<li> YOU&nbsp;&nbsp;BIDDED </li>`)
            }
            else
            {
                $('.dot').removeClass('green');
                $('.dot').addClass('red');
                
                logContainer.append(`<li> ${data.user_name}&nbsp;&nbsp;BIDDED</li>`)
            }

            // Plotly.extendTraces('chart',{
            //     y:[[data.value]],
            //     text:[[data.user_name]],
                
            // },[0]);
                
            
            curr_bid_value[0].innerText=`${data.value}`

        })
        $('#bid_button').click(function(e){
            e.preventDefault();
            // console.log(e);
            let bidValue=$('#bid_input')[0].value;
            console.log(bidValue);
            $('#bid_input')[0].value="";
            // now i can peacefully make an ajax request
            console.log("button clicked");

            $.ajax({
                url:`/bidraise?bidId=${self.bidRoomId}`,
                type:"POST",
                data:{value:bidValue},
                success:function(data){
                    console.log(data);
                    // console.log(curr_bid_value);
                    console.log("in success");
                    // so the curr_user rn is the highest bidder
                    if(data.bid)
                    {
                       
                        

                        self.socket.emit('placedbid',{
                            user_name:self.username,
                            user_email:self.userEmail,
                            value:bidValue,
                            room:self.bidRoomId
                        })
    
                        
                    }
                    else
                    {
                        // this will not be given to every user in the room but to the client user only
                        logContainer.append(`<li style="color:#fc2642"> ${data.message} </li>`)
                    }
                    
                }
            })

        })

    }
};

function getData(){
    return Math.random();
}


var c=0;
// setInterval(function(){
    
//     c++;

//     if(c>100)
//     {
//         Plotly.relayout('chart',{
//             xaxis:{
//                 range:[c-100,c]
//             }
//         })
//     }
// },200)