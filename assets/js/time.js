let timediv=$('.not-started-yet');
let mainDiv= $('.after-time');

mainDiv[0].hidden=true;
mainDiv[1].hidden=true;

let text=timediv[0].dataset.time;
console.log(text);
const countDown=()=>
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
        return;
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


let si=setInterval(countDown,100)
