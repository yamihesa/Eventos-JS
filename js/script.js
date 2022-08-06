document.addEventListener('DOMContentLoaded', () => {

    // Variables

    //let baseDeDatos = [];

    let carrito = [];
    const item = document.getElementById('items');
    const miCarrito = document.querySelector('#carrito');
    const total = document.querySelector('#total');
    const botonVaciar = document.querySelector('#boton-vaciar');

    const listaDeProductos = [
        {
            id: 1,
            nombre: "Vela de Adorno Chica",
            precio: 100,
            stock: 10,
            img: "imagenes/velas/adornos-para-velas.jpg"
        },
        {
            id: 2,
            nombre: "Vela de Adorno Mediana",
            precio: 150,
            stock: 15,
            img: "IMAGENES/Velas/OIP.jpg"
        },
        {
            id: 3,
            nombre: "Sahumerio de Incienso",
            precio: 120,
            stock: 20,
            img: "IMAGENES/Sahumerios/Sahumerio1.jpeg"
        },
        {
            id: 4,
            nombre: "Sahumerio de Sándalo",
            precio: 120,
            stock: 10,
            img: "IMAGENES/Sahumerios/Sahumerio2.jpg"
        },
        {
            id: 5,
            nombre: "Hornito de Cerámica",
            precio: 2900,
            stock: 10,
            img: "IMAGENES/Hornitos/Hornito.jpeg"
        },
        {
            id: 6,
            nombre: "Hornito de Cerámica",
            precio: 2000,
            stock: 10,
            img: "IMAGENES/Hornitos/hornito2.jpg"
        },
        {
            id: 7,
            nombre: "Fuente de Agua Mediana",
            precio: 8500,
            stock: 5,
            img:"IMAGENES/Fuentes/fuente1.png"
        },
        {
            id: 8,
            nombre: "Fuente de Agua Grande",
            precio: 10800,
            stock: 3,
            img:"IMAGENES/Fuentes/fuente2.jpg"
        },
        {
            id: 9,
            nombre: "Atrapasueños Mediano",
            precio: 1800,
            stock: 5,
            img:"IMAGENES/Atrapasueños/Atrapasueños.jpg"
        },
        {
            id: 10,
            nombre: "Atrapasueños Grande",
            precio: 2500,
            stock: 8,
            img:"IMAGENES/Atrapasueños/atrapasueños2.jpg"
        },
    ]
    

    // Funciones


    function renderizarProductos() {
        listaDeProductos.forEach((producto) => {
            // Estructura
            const mi = document.createElement('div');
            mi.classList.add('card', 'col-sm-4');
            // Body
            const miCardBody = document.createElement('div');
            miCardBody.classList.add('card-body');
            // Titulo
            const miTitle = document.createElement('h5');
            miTitle.classList.add('card-title');
            miTitle.innerText = producto.nombre;
            // Precio
            const miPrecio = document.createElement('p');
            miPrecio.classList.add('card-text');
            miPrecio.innerText = `$${producto.precio}`;
            //Stock
            const miStock = document.createElement('p');
            miStock.classList.add('card-text1');
            miStock.innerText = `Stock: ${producto.stock}`;
            //Imagen
            const miImagen = document.createElement('img')
            miImagen.classList.add('card-imagen')
            miImagen.setAttribute('src', producto.img) 
            // Boton 
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-secondary');
            miBoton.innerText = 'Agregar';
            miBoton.setAttribute('marcador', producto.id);
            miBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miCardBody.append(miImagen);
            miCardBody.append(miTitle);
            miCardBody.append(miPrecio);
            miCardBody.append(miStock);
            //miCardBody.append(miImagen)
            miCardBody.append(miBoton);
            mi.append(miCardBody);
            item.append(mi);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(e) {
        // Anyadimos el mi a nuestro carrito
        carrito.push(e.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        miCarrito.innerText = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los mis a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = listaDeProductos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el mi del item del carrito
            const mi = document.createElement('li');
            mi.classList.add('list-group-item', 'text-right', 'mx-2');
            mi.innerText = `${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn1');
            miBoton.innerText = 'X';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos mis
            mi.appendChild(miBoton);
            miCarrito.appendChild(mi);
        });
        // Renderizamos el precio total en el HTML
        total.innerText = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(e) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = e.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total , item) => {
            // De cada elemento obtenemos su precio
            const miItem = listaDeProductos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total +  miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.removeItem('carrito');

    }

    function guardarCarritoEnLocalStorage () {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (localStorage.getItem('carrito') !== null) {
            // Carga la productormación
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }
    }

    // Eventos
    botonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});