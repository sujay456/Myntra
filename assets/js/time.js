let timediv=$('.not-started-yet');
let mainDiv= $('.after-time');

mainDiv[0].hidden=true;
mainDiv[1].hidden=true;
let id=mainDiv[0].dataset.id;
let text=timediv[0].dataset.time;
let text1=mainDiv[0].dataset.end;
console.log(text);
var si2;
const countDownFStart=()=>
{
    // console.log(timediv);
    // console.log(future);
    
    timediv[0].hidden=false;
    let f=new Date(text).getTime();
    let p=new Date().getTime();
    
    let gap=f-p;
    if(gap<=0)
    {
        timediv[0].hidden=true;
        mainDiv[0].hidden=false;
        mainDiv[1].hidden=false;
        clearInterval(si)
        si2=setInterval(countDownFEnd,100);
        // return;
    }
    let sec=1000;
    let min=sec*60;
    let hr=min*60;
    let days=hr*24;

    let remDays=Math.floor(gap/days);
    let remHr=Math.floor((gap%days)/hr);
    let remMin=Math.floor((gap%hr)/min);
    let remSec=Math.floor((gap%min)/sec);

    // console.log(remHr,remMin,remSec);
    // console.log("hi");
    $('.fill-day')[0].innerText=remDays
    $('.fill-hr')[0].innerText=remHr
    $('.fill-min')[0].innerText=remMin
    $('.fill-sec')[0].innerText=remSec
    
    // console.log(remDays,remHr,remMin,remSec);
}

let si=setInterval(countDownFStart,100)

const countDownFEnd=()=>{
    // console.log("i did")
    let f=new Date(text1).getTime();
    let p=new Date().getTime();
    let gap2=f-p
    // console.log(gap2)

    if(gap2<=0)
    {
        clearInterval(si2)
        $.ajax({
            type:'GET',
            url:`/bidClose?id=${id}`,
            success:function(data){
                console.log(data);
                
                if(data.winner)
                    window.location.href=`/bidwinner?id=${id}`;
                else
                    window.location.href='/bidwinner?id="*"';
            }

        })
        // maybe redirect to the winner page
        return;
    }
    let sec=1000;
    let min=sec*60;
    let remMin=Math.floor(gap2/min);
    let remSec=Math.floor((gap2%min)/sec);
    $('.fill-min1')[0].innerText=remMin
    $('.fill-sec1')[0].innerText=remSec
    gap2--;
}

