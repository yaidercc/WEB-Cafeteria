<?php
require "connection.php";

class model {
    private $con;
    public function __construct(){
        $this->con=new Connection("CAFETERIA");
        $this->con=$this->con->connectionBd();
    }
    function getProducts(){
        $query= "SELECT 
                    P.*, C.NOMBRE AS CATEGORIA 
                    FROM PRODUCTO P 
                    INNER JOIN CATEGORIA C ON C.ID_CATEGORIA=P.ID_CATEGORIA_FK";
        $sql=$this->con->prepare($query);
        $sql->execute();
        $data=$sql->fetchAll(PDO::FETCH_ASSOC);
        return array("status"=>true,"data"=>$data);
        
    }
    function deleteProduct($id_product){
        $query= "DELETE FROM PRODUCTO WHERE ID_PRODUCTO=?";
        $sql=$this->con->prepare($query);
        $sql->bindParam(1,$id_product);
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) {
            return array("response"=>http_response_code(400),"status"=>false);
        }
        
    }
    function insertProduct($infoProduct){
        $query= "INSERT INTO `producto`(`NOMBRE`, `REFERENCIA`, `PRECIO`, `PESO`, `ID_CATEGORIA_FK`, `STOCK`, `FECHA_CREACION`) 
        VALUES (?,?,?,?,?,?,now())";
        $sql=$this->con->prepare($query);
        $sql->bindParam(1,$infoProduct["nombre"]);
        $sql->bindParam(2,$infoProduct["referencia"]);
        $sql->bindParam(3,$infoProduct["precio"]);
        $sql->bindParam(4,$infoProduct["peso"]);
        $sql->bindParam(5,$infoProduct["id_categoria"]);
        $sql->bindParam(6,$infoProduct["stock"]);
        $sql->execute();
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) {
            return array("response"=>http_response_code(400),"status"=>false);
        }
    }

    function updateProduct($infoProduct){
        $query= "UPDATE `producto` 
                    SET `NOMBRE`=?,
                        `REFERENCIA`=?,
                        `PRECIO`=?,
                        `PESO`=?,
                        `ID_CATEGORIA_FK`=?,
                        `STOCK`=? 
                    WHERE ID_PRODUCTO=$infoProduct[id_producto]";
        $sql=$this->con->prepare($query);
        $sql->bindParam(1,$infoProduct["nombre"]);
        $sql->bindParam(2,$infoProduct["referencia"]);
        $sql->bindParam(3,$infoProduct["precio"]);
        $sql->bindParam(4,$infoProduct["peso"]);
        $sql->bindParam(5,$infoProduct["id_categoria"]);
        $sql->bindParam(6,$infoProduct["stock"]);
        $sql->execute();
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) {
            return array("response"=>http_response_code(400),"status"=>false);
        }
    }

    function getCategories(){
        $query= "SELECT * FROM CATEGORIA";
        $sql=$this->con->prepare($query);
        $sql->execute();
        $data=$sql->fetchAll(PDO::FETCH_ASSOC);
        return array("status"=>true,"data"=>$data);

    }
    function insertSale($InfoSale){
        $query= "INSERT INTO `ventas`(`FECHA_VENTA`, `ID_PRODUCTO_FK`, `CANTIDAD`, `TOTAL`) 
                VALUES ('now()',?,?,?)";
        $sql=$this->con->prepare($query);
        $sql->bindParam(1,$InfoSale["id_producto"]);
        $sql->bindParam(2,$InfoSale["cantidad"]);
        $sql->bindParam(3,$InfoSale["total"]);
        $sql->execute();
        try {
            $sql->execute();
            return array("status"=>true);
        } catch (\Throwable $th) {
            return array("status"=>false);
        }
    }
}
