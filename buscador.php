<?php


    $string = file_get_contents("data-1.json");
    $object = json_decode($string, true);
    $tipoBusqueda = $_POST["busqueda"];
    $data = array();


    if($tipoBusqueda == "todo"){
        $tempId;
        $tempDireccion;
        $tempCiudad;
        $tempTelefono;
        $tempCodigoPostal;
        $tempTipo;
        $tempPrecio;

        for($i=0;$i<count($object);$i++){
            $tempId=$object[$i]["Id"];
            $tempDireccion=$object[$i]["Direccion"];
            $tempCiudad=$object[$i]["Ciudad"];
            $tempTelefono=$object[$i]["Telefono"];
            $tempCodigoPostal=$object[$i]["Codigo_Postal"];
            $tempTipo=$object[$i]["Tipo"];
            $tempPrecio=$object[$i]["Precio"];

            array_push($data,array("Id"=>$tempId,"Direccion"=>$tempDireccion,
            "Ciudad"=>$tempCiudad,"Telefono"=>$tempTelefono,
            "Codigo_Postal"=>$tempCodigoPostal,"Tipo"=>$tempTipo,
            "Precio"=>$tempPrecio));

        }

        echo json_encode($data);

    }else{

            $ciudadActual = $_POST["ciudad"];
            $tipoActual = $_POST["tipo"];
            $max = $_POST["maximo"];
            $min = $_POST["minimo"];
            $tempId;
            $tempDireccion;
            $tempCiudad;
            $tempTelefono;
            $tempCodigoPostal;
            $tempTipo;
            $tempPrecio;


            for($i=0;$i<count($object);$i++){
                $tempId=$object[$i]["Id"];
                $tempDireccion=$object[$i]["Direccion"];
                $tempCiudad=$object[$i]["Ciudad"];
                $tempTelefono=$object[$i]["Telefono"];
                $tempCodigoPostal=$object[$i]["Codigo_Postal"];
                $tempTipo=$object[$i]["Tipo"];
                $tempPrecio=$object[$i]["Precio"];
                $trimmed = str_replace("$", '', $tempPrecio);
                $finalPrice = str_replace(",", '', $trimmed);

                if($finalPrice<=$max && $finalPrice>=$min){
                    if($ciudadActual != "Elige una ciudad" && $tipoActual != "Elige un tipo"){
                        if($ciudadActual == $tempCiudad && $tipoActual == $tempTipo ){
                            array_push($data,array("Id"=>$tempId,"Direccion"=>$tempDireccion,
                            "Ciudad"=>$tempCiudad,"Telefono"=>$tempTelefono,
                            "Codigo_Postal"=>$tempCodigoPostal,"Tipo"=>$tempTipo,
                            "Precio"=>$tempPrecio));
                        }
                    }elseif($ciudadActual == "Elige una ciudad" && $tipoActual == "Elige un tipo"){
                        array_push($data,array("Id"=>$tempId,"Direccion"=>$tempDireccion,
                        "Ciudad"=>$tempCiudad,"Telefono"=>$tempTelefono,
                        "Codigo_Postal"=>$tempCodigoPostal,"Tipo"=>$tempTipo,
                        "Precio"=>$tempPrecio));
                    }elseif($ciudadActual != "Elige una ciudad" && $tipoActual == "Elige un tipo"){
                        if($ciudadActual == $tempCiudad ){
                            array_push($data,array("Id"=>$tempId,"Direccion"=>$tempDireccion,
                            "Ciudad"=>$tempCiudad,"Telefono"=>$tempTelefono,
                            "Codigo_Postal"=>$tempCodigoPostal,"Tipo"=>$tempTipo,
                            "Precio"=>$tempPrecio));
                        }
                    }elseif($ciudadActual == "Elige una ciudad" && $tipoActual != "Elige un tipo"){
                        if($tipoActual == $tempTipo){
                            array_push($data,array("Id"=>$tempId,"Direccion"=>$tempDireccion,
                            "Ciudad"=>$tempCiudad,"Telefono"=>$tempTelefono,
                            "Codigo_Postal"=>$tempCodigoPostal,"Tipo"=>$tempTipo,
                            "Precio"=>$tempPrecio));
                        }
                    }


                }
            }

            echo json_encode($data);
        }

 ?>
