
//Cargo el stock de productos segun su ID
//VELAS-SAHUMERIOS-HORNITOS-FUENTES-ATRAPASUEÑOS
const productos = [
    {
        id: 1,
        nombre: "Vela de Adorno Chica",
        precio: 100,
        stock: 10,
        img: "./IMAGENES/Velas/adornos-para-velas.jpg"
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


const carrito = [] 
const seccionProductos = document.getElementById("seccion-productos");

const seccionCarrito = document.getElementById("seccion-carrito");

const botonVaciar = document.getElementById("vaciar-carrito")

const precioTotal = document.getElementById("precioTotal")


botonVaciar.addEventListener("click", () => {
    carrito.length = 0
    actualizarCarrito()
})

        productos.forEach((producto)=>{
            const div = document.createElement("div")
            div.classList.add("producto")
            div.innerHTML=`            
            <img class= card-img src=${producto.img}  alt="">
            <h4>${producto.nombre}</h4>
            <p class="precioProducto">Precio:$ ${producto.precio}</p>
            <button id="agregar${producto.id}" class="boton-agregar">Agregar</button>
            `
             seccionProductos.appendChild(div)

             const boton = document.getElementById(`agregar${producto.id}`)
            
             boton.addEventListener("click", () => {
                agregarAlCarrito(producto.id)
             })
        });

        const agregarAlCarrito = (prodId) => {
            const existe = carrito.some (prod => prod.id === prodId)

            if (existe){
                const prod = carrito.map (prod =>{
                    if (prod.id === prodId){
                        prod.cantidad++
                    }
                })
            }  else{

            const item = productos.find((prod) => prod.id === prodId)
            carrito.push(item)
        }
        /* actualizarCarrito() */
        }
        const eliminarDelCarrito = (prodId) => {
            const item = carrito.find((prod) => prod.id === prodId)
            const indice = carrito.indexOf(item)
            carrito.splice(indice, 1)
            actualizarCarrito()
        }

        const actualizarCarrito = () => {
            seccionCarrito.innerHTML = ""

            carrito.forEach((prod) => {
                const aside = document.createElement("aside")
                aside.className = ("productoEnCarrito")
                aside.innerHTML =`
                <p>${prod.nombre}</p>
                <p>Precio: ${prod.precio}</p>
                <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
                <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"></button>
                `
                seccionCarrito.appendChild(aside)
            })
            contadorCarrito.innerText = carrito.length
            precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)   
        }




