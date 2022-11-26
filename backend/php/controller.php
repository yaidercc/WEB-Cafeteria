<?php


require_once "model.php";
class Controller
{
    private $model;
    public function __construct()
    {
        $this->model = new model();
        if (method_exists($this, $_POST["method"]) && is_callable(array($this, $_POST["method"]))) {
            call_user_func(array($this, $_POST["method"]));
        }
    }
    public function getProducts()
    {
        echo json_encode($this->model->getProducts());
    }
    public function deleteProduct()
    {
        echo json_encode($this->model->deleteProduct($_POST["id_producto"]));
    }
    public function insertProduct()
    {
        echo json_encode($this->model->insertProduct($_POST));
    }
    public function updateProduct()
    {
        echo json_encode($this->model->updateProduct($_POST));
    }
    public function getCategories()
    {
        echo json_encode($this->model->getCategories());
    }
    public function insertSale()
    {
        echo json_encode($this->model->insertSale($_POST));
    }
}
$cont = new Controller();
