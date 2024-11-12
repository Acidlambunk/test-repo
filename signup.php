<html>
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Sign In</title>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="css/style.css">
</head>
<style>
 .box {
  width:100%;
  max-width:400px;
  background-color:#f9f9f9;
  border:1px solid #ccc;
  border-radius:5px;
  padding:16px;
  margin:0 auto;
 }
</style>
<?php
require_once 'vendor/autoload.php';

// init configuration
$clientID = '1002649697094-3p7o5sb3oru32bgnd6uonfil1l6b49bo.apps.googleusercontent.com';
$clientSecret = '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'; 
$redirectUri = 'http://localhost:8081/studysurf/';

// create Client Request to access Google API
$client = new Google_Client();
$client->setClientId($clientID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri($redirectUri);
$client->addScope("email");
$client->addScope("profile");

// authenticate code from Google OAuth Flow
if (isset($_GET['code'])) {
  try {
      $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
      if (!isset($token['error'])) {
          $client->setAccessToken($token['access_token']);

          // get profile info
          $google_oauth = new Google_Service_Oauth2($client);
          $google_account_info = $google_oauth->userinfo->get();
          $email = $google_account_info->email;
          $name = $google_account_info->name;

          // Display user info
          echo '<div class="container">';
          echo '<div class="box">';
          echo '<div class="form-group">';
          echo '<label for="email">Emailid: ' . htmlspecialchars($email) . '</label>';
          echo '<label for="name">Name: ' . htmlspecialchars($name) . '</label>';
          echo '</div></div></div>';
      } else {
          echo '<div class="error">Error fetching token: ' . htmlspecialchars($token['error']) . '</div>';
      }
  } catch (Exception $e) {
      echo '<div class="error">Error: ' . htmlspecialchars($e->getMessage()) . '</div>';
  }
} else {
  ?>
  <div class="container">  
    <div class="table-responsive">  
      <div class="box">
        <div class="form-group">
          <label for="email">Emailid</label>
          <input type="text" name="email" id="email" placeholder="Enter Email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" name="pwd" id="pwd" placeholder="Enter Password" class="form-control"/>
        </div>
        <div class="form-group">
          <input type="submit" id="login" name="login" value="Login" class="btn btn-success form-control"/>
          <hr>
          <center><a href="<?php echo htmlspecialchars($client->createAuthUrl()) ?>"><img src="google-signin.png" width="256"></a></center>
        </div>
      </div>  
    </div>  
  </div>
<?php } ?>
</body>  
</html>
