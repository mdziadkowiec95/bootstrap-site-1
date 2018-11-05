<?php 

if (isset($_POST['submit'])) {

  $name = $_POST['name'];
  $subject = $_POST['subject'];
  $mailFrom = $_POST['mail'];
  $message = $_POST['message'];

  $mailTo = "hrmdrum@michaldziadkowiec.pl";
  $headers = "From: ".$mailFrom;
  $txt = "Otrzymałeś wiadomość od: ".$name.".\n\n".$message;

  mail($mailTo, $subject, $txt, $headers);
  header("Location: kontakt.php?mailsend");

}
