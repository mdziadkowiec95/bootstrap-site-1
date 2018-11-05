<?php 

if (isset($_POST['submit'])) {

  $name = $_POST['name'];
  $subject = $_POST['subject'];
  $mailFrom = $_POST['email'];
  $message = $_POST['message'];

  $mailTo = "hrmdrum@michaldziadkowiec.pl";

  // Set content-type header for sending HTML email
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  $headers .= "From: ".$mailFrom;

  $txt = '
  <html>
  <head>
      <title>Wiadomość ze strony carFix</title>
  </head>
  <body>
      <h1>Wiadomość ze strony carFix</h1>
      <table cellspacing="0" style="border: 2px dashed #FB4314; width: 300px; height: 200px;">
          <tr>
              <th>Od:</th><td>'.$name.'</td>
          </tr>
          <tr style="background-color: #e0e0e0;">
              <th>Email:</th><td>'.$mailFrom.'</td>
          </tr>
          <tr>
              <th>Treść:</th><br><br><td>'.$message.'</td>
          </tr>
      </table>
  </body>
  </html>';

  mail($mailTo, $subject, $txt, $headers);
  header("Location: kontakt.php?mailsend");
}

?>