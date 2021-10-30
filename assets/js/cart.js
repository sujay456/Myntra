$('.remove-from-cart').on('click', function (event) {

    console.log(event.target.dataset.product);

    window.location.href = `/delete-item?id=${event.target.dataset.product}`;

}) 