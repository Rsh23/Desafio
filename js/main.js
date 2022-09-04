let productos;
let categorias;

$(function() {

    getCategories();
    getProducts();
    filterProducts();
    searchProduct();

});


// Aqui obtenemos las categorias
async function getCategories() {

    // Llamamos a la api
    const response = await fetch("http://localhost:8000/categories");

    // Aqui convertimos los datos en JSON
    categorias = await response.json();

    // Iteramos las categorias y se insertan en el html para que sean visibles al usuario
    categorias.data.map((categoria) => {
        $("#categorias").append(
            '<a href="#" class="categoryNav list-group-item list-group-item-action" data-id="' + categoria.id + '">' + categoria.name + '</a>'
        );
    });
}

// Obtener productos
async function getProducts() {

    // Llamamos a la api
    const response = await fetch("http://localhost:8000/products");

    // Aqui convertimos los datos en JSON
    productos = await response.json();

    // iteramos los productos y los insertamos en el html para que sean visibles al usuario
    productos.data.map((p) => {
        $("#productos").append(crearProducto(p))
    });

}

// Filtro de productos
function filterProducts() {

    $('#categorias').on('click', 'a.categoryNav', function(e) {

        e.preventDefault();

        const categoria_id = $(this).data('id');

        //Aqui hacemos un filtro de los productos
        const newArrayProductos = productos.data.filter(p => p.category === categoria_id);

        $("#productos").html(''); //Limpiamos el contenido de los productos

        //Aqui mostramos los productos filtrados
        newArrayProductos.map((p) => {
            $("#productos").append(crearProducto(p))
        });
    })

}

// Creamos las tarjetas de productos y las rellenamos con los datos del producto
function crearProducto(p) {
    // Retornamos el html
    return '<div class="col-2 mb-3">' +
        '<div class="card h-100">' +
        '<img src="' + p.url_image + '" class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + p.name + '</h5>' +
        '<p class="card-text"> $' + p.price + '</p>' +
        '</div>' +
        '<div class="mb-3">' +
        '<button class="btn btn-primary" type="button">Añadir al carro</button>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// Busqueda de productos
function searchProduct() {

    $('form').submit(function(e) {

        e.preventDefault();

        let data = $(this).serializeArray();

        // Url para la conexion a la api
        let url = "http://localhost:8000/search/product/";

        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            data: data,
            success: function(p) {
                // Guardamos la respuesta
                newData = p;

                // Limpiamos el contenido de productos
                $("#productos").html('');

                const newArrayProductos = newData.data;

                // Iteramos y insertamos los productos segun busqueda
                newArrayProductos.data.map((p) => {
                    console.log(p)
                    $("#productos").append(crearProducto(p))
                });

            }

        });

    });

}