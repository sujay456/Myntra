$('.remove-from-cart').on('click', function (event) {

    event.preventDefault();
    // console.log(event.target);
    console.log(event.target.dataset.product);

    window.location.href = `/delete-item?id=${event.target.dataset.product}`;

}) 

$('.decreaseQuantity').on('click', function (event) {

    event.preventDefault();

    console.log(event.target.dataset.product);

   
    window.location.href = `/decrease-quantity?id=${event.target.dataset.product}`;

}) 

$('.increaseQuantity').on('click', function (event) {

    event.preventDefault();
    console.log(event);

    window.location.href = `/increase-quantity?id=${event.target.dataset.product}`;

}) 