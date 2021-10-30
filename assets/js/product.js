function changeImage(element) {

    var main_prodcut_image = document.getElementById('main_product_image');
    main_prodcut_image.src = element.src;


}

$('.add-to-cart').on('click', function (event) {

    console.log(event.target.dataset.product);

    window.location.href = `/add-item?id=${event.target.dataset.product}`;

}) 