import {
    peticion
} from "./main.js";
let productos=[];

// Obtener todos los productos
const getProductos = async () => {
    return peticion("getProducts")
}
//Renderizar productos en ventas
const mostrarProductosVentas = () => {
    const containerProductos=document.getElementById("container-cards");
    let productosInfo="";
    productos.data.map((item)=>{
        productosInfo+=`
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <div class="image-product">
                        <ion-icon name="cafe"></ion-icon>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-capitalize">${item.NOMBRE}</h5>
                        <p class="card-text stock"><span>${item.STOCK}</span> Unidades disponibles</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <button class="btn btn-primary">Vender</button>
                            <p class="card-text price-product">$ ${item.PRECIO}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    containerProductos.innerHTML=productosInfo;
}

window.addEventListener('load', async()=> {
    productos = await getProductos();
    if(productos.data.length>0){
        mostrarProductosVentas();
    }
    console.log('La página ha terminado de cargarse!!');
});

// Obtener todas las categorias
// Insertar producto
// Eliminar producto
// Actualizar producto
// Vender producto