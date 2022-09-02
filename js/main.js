let productos;
let categorias;

$(function() {

    changeView("produ ctos");
    getCategories();
    getProducts();


    $('#categorias').on('click', 'a.categoryNav', function(e) {

        e.preventDefault();
        const categoria_id = $(this).data('id');

        //Aqui hacemos un filtro de los productos
        const newArrayProductos = productos.filter(p => p.category === categoria_id);
        $("#productos").html(''); //Limpiamos el contenido de los productos


        //Aqui mostramos los productos filtrados
        newArrayProductos.map((p) => {
            $("#productos").append(crearProducto(p))
        });
    })
});

// Aqui cambiamos entre las vistas
function changeView(obj) {
    $(".view").hide();
    $("#" + obj).show();
}

// Aqui obtenemos las categorias
async function getCategories() {

    // Llamamos a la api (aun no esta xd)
    const response = await fetch("/back/category.json");

    // Aqui convertimos los datos en JSON
    categorias = await response.json();

    // Iteramos las categorias y se insertan en el html para que sean visibles al usuario
    categorias.map((categoria) => {
        $("#categorias").append(
            '<a href="#" class="categoryNav list-group-item list-group-item-action" data-id="' + categoria.id + '">' + categoria.name + '</a>'
        );
    });
}

// Obtener productos
async function getProducts() {

    // Llamamos a la api (aun no esta xd)
    const response = await fetch("/back/products.json");

    // Aqui convertimos los datos en JSON
    productos = await response.json();

    // iteramos los productos y los insertamos en el html para que sean visibles al usuario
    productos.map((p) => {
        $("#productos").append(crearProducto(p))
    });

}


// Creamos las tarjetas de productos y las rellenamos con los datos del producto
function crearProducto(p) {
    return '<div class="col-2">' +
        '<div class="card">' +
        '<img src="..." class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + p.name + '</h5>' +
        '<p class="card-text">' + p.price + '</p>' +
        '<a href="#" class="btn btn-primary">Go somewhere</a>' +
        '</div>' +
        '</div>' +
        '</div>';
}