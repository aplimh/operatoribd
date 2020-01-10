<?php 
require 'conect.php'; 

function executaGET($cnx) {
    $articole = [];
    $cda = "SELECT * FROM listaoper ORDER BY locatie ASC";
    
    if ($rez = mysqli_query($cnx,$cda)) {
        
            // Se preiau liniile pe rand
        while ($linie = mysqli_fetch_assoc($rez)) {
            $articole[] = $linie;
        }

            // Eliberez memoria ocupata de multimea de selectie 
        mysqli_free_result($rez);
    }
    echo json_encode($articole);
}  

function executaPOST($cnx) {
    $sir = citeste();
    $nume = $sir['nume']; 
    $numePrenume = $sir['numePrenume']; 
    $email = $sir['email']; 
    $locatie = $sir['locatie'];

    $raspuns = [];
    $cda = "INSERT INTO listaoper (nume, numePrenume, email, locatie) VALUES ('$nume', '$numePrenume', '$email', '$locatie')";
    if (mysqli_query($cnx, $cda)) {
        $raspuns[] = ['rezultat' => "OK"];
        $raspuns[] = ['id' => mysqli_insert_id($cnx)];
    } else {
        $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
    }
    echo json_encode($raspuns); 
}

function executaPUT($cnx) {
    $sir = citeste();
    $id = $sir['id'];
    $nume = $sir['nume'];  
    $numePrenume = $sir['numePrenume']; 
    $email = $sir['email'];
    $locatie = $sir['locatie'];

    $raspuns = [];
    $cda = "UPDATE listaoper SET nume='$nume', numePrenume='$numePrenume', email='$email', locatie='$locatie' WHERE id=$id";
    if (mysqli_query($cnx, $cda)) {
        $raspuns[] = ['rezultat' => "OK"];
    } else {
        $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
    }
    echo json_encode($raspuns);
}

function executaDELETE($cnx) {
    $sir = citeste();
    $id = $sir['id'];

    $cda = "DELETE FROM listaoper WHERE id = $id";
    $raspuns = [];

    if (mysqli_query($cnx, $cda)) {
        $raspuns[] = ['rezultat' => "OK"];
    } else {
        $raspuns[] = ['rezultat' => 'Eroare: ' . mysqli_error($cnx)];
    }
    echo json_encode($raspuns);
    } 

function citeste() {
    $json = file_get_contents('php://input');
    // Apoi se creaza sirul asociativ $sir
    $sir = json_decode($json, true); // decodificare json
    // print_r($sir);
    return $sir;
}

   // require 'conect.php';
   // header("Access-Control-Allow-Origin: *");

$metoda = $_SERVER['REQUEST_METHOD'];
switch ($metoda) {
    case 'GET':
    executaGET($cnx);  
    break;
    
    case 'POST':
    executaPOST($cnx);  
    break;
    
    case 'PUT':
    executaPUT($cnx);  
    break;

    case 'DELETE':
    executaDELETE($cnx);  
    break;
}

mysqli_close($cnx);
?>
