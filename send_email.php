<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'no-reply@ipams.online';
        $mail->Password = '$Y2g7SdSyS';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // REQUIRED BY HOSTINGER
        $mail->setFrom('no-reply@ipams.online', 'Website Contact Form');
        $mail->addReplyTo($email, $name);  // user email is reply-to

        // Receiver
        $mail->addAddress('khensabeniano10@gmail.com', 'Khen');

        // Email content
        $mail->isHTML(true);
        $mail->Subject = "possible ojt $name";
        $mail->Body = "
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();
        echo 'Message has been sent successfully!';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request";
}
?>
