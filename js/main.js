export function peticion(metodo, param=null) {
    // create new formdata
    let data = new FormData();
    // add method
    data.append("method", metodo)
    if (param) {
        param.forEach((el, i) => {
            data.append(i, el);
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