<?php
$client_name = $_POST['name'];
$client_email = $_POST['email'];
$client_number = $_POST['number'];
$client_name = htmlspecialchars($name);
$client_email = htmlspecialchars($email);
$client_number = htmlspecialchars($numbe);
$client_name = urldecode($name);
$client_email = urldecode($email);
$client_number = urldecode($number);
$client_name = trim($name);
$client_email = trim($email);
$client_number = trim($number);

if (mail("hr.andriygtr@gmail.com", "Заявка с сайта", "name:".$name.". E-mail: ".$email ,". Number: ".$number, "From: example2@mail.ru \r\n"))
 {     echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}?>