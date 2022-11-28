import {
    peticion,
    createElements
} from "./main.js";

class GestionProducto {
    _productos = [];
    _categorias = [];

    constructor(){
        this.mostrarCategorias()
    }

    // Obtener todos los productos
    getProductos = async () => {
        return peticion("getProducts");
    }
    // Obtener todas las categorias
    getCategorias = async () => {
        return peticion("getCategories");
    }

    // mostrar categorias
    mostrarCategorias = async () => {
        this._categorias = await this.getCategorias();
        const selectCategoria = document.querySelector("#categorias");
        this._categorias.data.map((item)=>{
            selectCategoria.appendChild(createElements("option",item.NOMBRE,
                {
                    name:"value",
                    value:item.ID_CATEGORIA}
            ))
        })
    }

    //Renderizar productos en ventas
    mostrarProductosVentas = async () => {
        this._productos = await this.getProductos();
        const containerProductos = document.getElementById("container-cards");
        let productosInfo = "";
        this._productos?.data.map((item) => {
            productosInfo += `
            <div class="col-6 col-md-4">
                <div class="card" style="width: 100%;">
                    <div class="image-product">
                        <ion-icon name="cafe"></ion-icon>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-capitalize">${item.NOMBRE}</h5>
                        <p class="card-text stock"><span>${item.STOCK}</span> Unidades disponibles</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <button class="btn btn-primary btn-sale" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${item.ID_PRODUCTO}>Vender</button>
                            <p class="card-text price-product">$ ${item.PRECIO}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        });

        if(productosInfo) containerProductos.innerHTML=productosInfo;
    }

    // Insertar producto
    insertarProducto(data){
        const body={}
        data.forEach((item,index)=>{
            body[index]=item;
        });

        peticion("insertProduct",body)
        .then((resp)=>{
            this.mostrarProductosVentas();
        })
    }
    // Obtener todas las categorias
}
const formAddProducto=document.getElementById("form_add-product");
const gestionProductos= new GestionProducto();

//Mostar productos
gestionProductos.mostrarProductosVentas();

// Insertar productos
formAddProducto.addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("envioss");
    const form =new FormData(formAddProducto);
    gestionProductos.insertarProducto(form)
})

// Eliminar producto
// Actualizar producto
// Vender producto