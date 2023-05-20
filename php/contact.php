<!DOCTYPE html>
<html lang="en">
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>KSP2 | Contact.php</title>
        <link rel="stylesheet" href="https://api-ssps.cajthaml.eu/file/global/css/reset_ld9mrCCm.css">
        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
        <main>
            <div class="sectionHeader">
                <h2 class="sectionText"><b>Contact.php</b></h2>
            </div>
                
            <section class="message full-width">
                <?php
                    $to = "target@seznam.cz";
                    $subject = $_POST['messageType'];
                    $message = $_POST['message'];
                    $headers = "From: ".$_POST['email'];

                    echo "To: ".$to."<br>Subject: ".$subject."<br>Message: <b>".$message."</b><br>Headers: ".$headers;

                    ini_set("SMTP", "smtp.gmail.com");
                    ini_set("smtp_port", "587");
                    ini_set("username", "email@gmail.com");
                    ini_set("password", "password");
                    ini_set("SMTPSecure", "tls");

                    if(mail($to, $subject, $message, $headers)) {
                        echo "<p>Thank you for your message!</p>";
                    } else {
                        echo "<p>Sorry, there was an error sending your message. Please try again later.</p>";
                    }
                ?> 
            </section>

        </main>
    </body>
    <?php
        //sleep(3); # https://www.w3schools.com/php/func_misc_sleep.asp
        header('Location: ../contact.html');
    ?>
</html>
<!-- https://www.quora.com/How-can-I-run-my-PHP-content-on-GitHub-pages -->