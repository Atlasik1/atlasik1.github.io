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
                    if ($_SERVER["REQUEST_METHOD"] == "POST") { // https://www.w3schools.com/php/php_form_validation.asp
                        $to = "press@privatedivision.com"; // https://www.w3schools.com/php/php_variables.asp
                        $subject = strip_tags($_POST['messageType']); // https://www.w3docs.com/snippets/php/how-can-i-sanitize-user-input-with-php.html
                        $message = strip_tags($_POST['message']);
                        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
                        $headers = "From: ".$email;
                    
                        echo "To: ".$to."<br>Subject: ".$subject."<br>Message: <b>".$message."</b><br>Headers: ".$headers;
                    
                        if(mail($to, $subject, $message, $headers)) { // https://mailtrap.io/blog/php-email-contact-form/
                            echo "<p>Thank you for your message!</p>";
                        } else {
                            echo "<p>Sorry, there was an error sending your message. Please try again later.</p>";
                        }
                        //sleep(3); # https://www.w3schools.com/php/func_misc_sleep.asp
                        header('Location: ../contact.html');
                        exit();
                    }
                ?> 
            </section>

        </main>
    </body>
</html>
<!-- https://www.quora.com/How-can-I-run-my-PHP-content-on-GitHub-pages -->