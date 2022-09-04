# Documentacion e-Test(Front)


En este apartado se describe la arquitectura la cual detendra el Front-End y las correspondientes tecnologías usadas, en este caso en especifico se uso vanilla JavaScript
con librerias como lo son Jquery y Bootstrap.

A continuacion se explicaran los metodos que este contiene:

## Metodo con el cual se obtienen las categorias:

    async function getCategories() {

    // Llamamos a la api
    const response = await fetch(url + "categories");

    // Aqui convertimos los datos en JSON
    categorias = await response.json();

    // Iteramos las categorias y se insertan en el html para que sean visibles al usuario
    categorias.data.map((categoria) => {
        $("#categorias").append(
            '<a href="#" class="categoryNav list-group-item list-group-item-action" data-id="' + categoria.id + '">' + categoria.name + '</a>'
        );
    });
    }
    
## Metodo con el cual se obtienen y se muestran los productos:

    async function getProducts() {

    // Llamamos a la api
    const response = await fetch(url + "products");

    // Aqui convertimos los datos en JSON
    productos = await response.json();

    // iteramos los productos y los insertamos en el html para que sean visibles al usuario
    productos.data.map((p) => {
        $("#productos").append(crearProducto(p))
    });

    }
    
## Metodo con el cual se filtran los productos segun categoria:

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
    
## Metodo con el cual se crea el html de los productos:

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
     
 ## Metodo con el cual se busca mediante caracteres ingresados por el usuario :
 
    function searchProduct() {

    $('form').submit(function(e) {

        e.preventDefault();

        let data = $(this).serializeArray();

        // Url para la conexion a la api

        $.ajax({
            url: url + "search/product",
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
                    $("#productos").append(crearProducto(p))
                });

            }

        });

    });

    }
