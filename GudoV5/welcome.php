<?php
session_start();
include_once"config/db.php";
if(strlen($_SESSION['USERLOGIN'])==0)
{
  header('location:index.php');
}
else{
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gudo</title>
    <script src="compromise.js"></script>
    <script src="main.js" defer ></script>
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="popup.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
      <!-- HEADER -->
      <header>
        <!-- LOGO -->
        <div class="logo">
            <img class="gudo_logo" src="images/GudoLogo.svg" id="logo">
        </div>
    </header>

    <!-- MAIN GRID -->
    <!-- FULLSCREEN JS -->
    <script>
        //For browser compatibility for MS, Mozilla, and Chrome
        function getFullcreenElement(){
            return document.fullscreenElement
            || document.webkitFullscreenElement
            || document.mozFullscreenElement
            || document.msFullscreenElement;
        }
        //Function for toggling on and off fullScreen mode
        function toggleFullscreen(){
            if(getFullcreenElement()){
                document.exitFullscreen();
            }
            else{
                document.getElementById("image_box").requestFullscreen().catch(console.log);
            }
        }
        //double click event listener for togglefullscreen
        document.addEventListener("dblclick", ()=>{
            toggleFullscreen();
        });

        document.addEventListener("fullscreenchange", ()=>{
            console.log("full screen changed!");
        });

    </script>
    <!-- END OF FULLSCREEN JS -->

    <div class="grid_container">
        <main id="image_box">  
            <div class="mic_container">
                  <i class="fas fa-microphone-alt" id="listening_mic"> </i>
            </div>
            <h1>WELCOME</h1>
            <!-- SEARCH BAR -->
        <div class="search">
            <input type="text" placeholder="Gudo Search..." autocomplete="off" autofocus>

            <div class="talk_btn">🎤</div>

            <div class="search_button">Search</div>
            
            <br>
            <p class="info"></p>        
        </div>
			<div class="gallery"></div>
			<div class="next">Next page</div>
        </main>
        <!-- END OF MAIN GRID -->

        <!-- SIDEBAR NAVIGATION -->
        <section class="side_bar">
            <div class="wrapper">
                <div class="sidebar">
                    
                    <ul>
                        <li><a href="/web_pages/home.html"><i class="fas fa-home"></i> Home</a></li>
                        <br>

                        <!-- Trigger the Logout -->
                        <li><a href="logout.php"><i class="fas fa-user"></i> Log Out </a></li>
                            
                            <form action="" method="post">
                                <!-- The Modal for Login -->

                                <div class="modal" id="LoginModal">
                                <div class="modal-dialog">
                                    <div class="modal-content">

                                    <!-- Modal Header -->
                                    <div class="modal-header">
                                        <h4 class="modal-title" align="center" >Login</h4>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>

                                    <!-- Modal body -->
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label for="usernamefor">User Name</label>
                                            <input type="text" class="form-control" id="usernameid" name="username">
                                        </div>
                                        <div class="form-group">
                                            <label for="Passwordfor">User Password</label>
                                            <input type="text" class="form-control" id="passwordid" name="password">
                                        </div>
                                    </div>

                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                        <button type="submit" name="login" class="btn btn-success" >Login</button>
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    </div>

                                    </div>
                                </div>
                                </div>
                            </form>
                        <br>
                        <li><a href="#"><i class="fas fa-address-card"></i> About</a></li>
                        <br>
                        <li><a href="#"><i class="fa fa-book"></i> Saves</a></li>
                    </ul> 
                </div>
            </div>
        </section>

        <!-- LINK IN DESCRIPTION -->
        <section class="description">
            <a href="www.amazon.com">Affiliate link</a>
        </section>

        <!-- FOOTER -->
        <section class="footer">
            <div class="footer">
                <div class="footer-content">
                    <div class="footer-section about">
                        <h2>Gudo inc.</h2>
                        <p>Visual Assistant</p>
                        <div class="contact">
                            <span><i class="fas fa-envelope"> &nbsp; info@email.com</i></span>
                        </div>
                    </div>
                    <div class="footer-section contact-form">
                        <br>
                        <h3>CONTACT US</h3>
                        <br>
                        <form action="layout_one.html" method="post">
                             <input type="email" name="email" class="text-input contact-input" placeholder="Your Email address">

                             <input name="message" class="text-input contact-input" placeholder="Your message"></input>

                            <button type="submit" class="btn btn-big"></button>
                        </form>
                     </div>
                </div>
                    
                <div class="footer-bottom">
                            &copy; Gudo | Designed by GWG and Charles 
                 </div>
            </div>
        </section>

    
        <!-- LIBRARY -->
        <section class="library">
            <h2>Your Library</h2>
			<div class="library_gallery"></div>
        </section>
        
        <div class="image">

        </div>
    </div>
</body>
</html>
<?php
}

?>