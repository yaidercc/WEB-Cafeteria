export function peticion(metodo, param=null) {
    // create new formdata
    let data = new FormData();
    // add method
    data.append("method", metodo)
    if (param) {
        Object.entries(param).map(([key, value])=>{
            data.append(key, value);
        })
    }
    // requests to de view source
    let response = fetch("http://localhost/store/backend/php/controller.php", {
            method: "POST",
            body: data
        })
        // convert data in json
        .then(resp => resp.json())
        .then(data => data)
        .catch(err => err)
    // return data
    return response;
}


export function createElements(name, value, ...attrs) {
    let element = document.createElement(name);
    console.log(arguments);
    // asignar contenido
    element.innerHTML = value;
    // asignar clase
    attrs.map(el => {
      // validar id repetido
      if (el.name == "id" && document.getElementById(el.value)) {
        return console.error("ya hay un elemento con este id");
      }
      // agregar clases
      if (el.name == "class") {
        element.classList.add(el.value)
      } else {
        console.log(el);
        element.setAttribute(el.name, el.value)
        console.log(element);
      }
    })
    return element;
  }