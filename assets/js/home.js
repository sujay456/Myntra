$('.product-preview').on('click', function (event) {

    console.log(event.target.dataset.product);

    window.location.href = `/product?id=${event.target.dataset.product}`;

})
