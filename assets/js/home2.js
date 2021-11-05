$('.product-bidding').on('click', function (event) {

    console.log(event.currentTarget);
    console.log(event.target.dataset.product);

    window.location.href = `/bidding_page?id=${event.target.dataset.product}`;

}) 

function fillModal(pname,pimage,pprice,pid){
    document.querySelector('.imgp').src="images/"+pimage;
    document.querySelector('.product-title').innerText=pname;
    document.querySelector('.product-price').innerText=pprice;
    document.querySelector('.p-view').href="/product?id="+pid;
}
