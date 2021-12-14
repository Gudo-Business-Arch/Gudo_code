<?php
	session_start();
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
	
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js"></script>
	<link rel="stylesheet" href="popup.css">
	
</head>
<body>
	<!-- HEADER -->
	<header>
		<!-- LOGO -->
		<div class="logo">
			<img class="gudo_logo" src="images/GudoLogo.svg" id="logo">
		</div>
	</header>
	<!--END  HEADER -->
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
	<!-- MAIN GRID -->
	<div class="grid_container">
		<main id="image_box">  
			<div class="mic_container">
				  <i class="fas fa-microphone-alt" id="listening_mic"> </i>
			</div>
			<!-- SEARCH BAR -->
			<p align='center'>What can i pull up for you?</p>
			<div class="search">
				
				<input type="text" placeholder="Gudo Search..." autocomplete="off" autofocus>
				<div class="talk_btn">🎤</div>
				<div class="search_button">Search</div>
				<br>	  
			</div>
			<!-- END SEARCH BAR -->
			<!-- where image displays -->
			<div class="gallery"></div>
			<div class="next">Next page</div>
		</main>
	<!-- END OF MAIN GRID -->
		<!-- SIDEBAR NAVIGATION -->
		<section class="side_bar">
			<div class="wrapper">
				<div class="sidebar">
					<ul>
						<li><a href="/web_pages/home.html"><i class="fas fa-home"></i>  Home</a></li>
						<br>
						<!-- Trigger the Login modal -->
						<li><a href="#" data-bs-toggle="modal" data-bs-target="#LoginModal"><i class="fas fa-user"></i>  Login </a></li>
						<br>
						<!-- Trigger the Login modal -->
						<li><a href="#" data-bs-toggle="modal" data-bs-target="#signupModal"><i class="fas fa-user-plus"></i>  Sign Up </a></li>
						<br>
						<li><a href="gudo_website/home.html"><i class="fas fa-question-circle"></i>  Need Help?</a></li>
						<br>
						<li><a href="#"><i class="fa fa-book"></i> Your Library</a></li>
						
							<!-- Once the user logs in this php routes them to welcome page -->
							<?php
								if(isset($_POST['login']))
								{
										$username=$_POST["username"];
										$userpassword=$_POST["password"];
									include_once("config/db.php");
									$sql="SELECT UserName, UserEmail, LoginPassword FROM user WHERE (UserName=:Uname || UserEmail=:Uname)";
						
									$query=$dbh->prepare($sql);
									$query->bindParam(':Uname',$username,PDO::PARAM_STR);
									$query->execute();
									$results=$query->fetchAll(PDO::FETCH_OBJ);
									if($query->rowCount()>0)
									{
										foreach($results as $row);
										$hashpass=$row->LoginPassword;
											if(password_verify($userpassword,$hashpass))
											{
												$_SESSION["USERLOGIN"]=$_POST['username'];
											   echo " <script type'text/javascript'> document.location='welcome.php';</script>";
											}
									}
									//if login is unsuccesful
									else
									{
										echo "wrong password";
									}
								}
							?>
						   <!-- START LOGIN -->
							<form method="post">
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
												<!-- username -->
												<div class="form-group">
													<label for="usernamefor">User Name</label>
													<input type="text" class="form-control" id="usernameid" name="username">
												</div>
												 <!-- email -->
												<div class="form-group">
													<label for="user_email">Email:</label>
													 <input type="text" class="form-control" name="User_Email" id="user_email">
												</div>
												<!-- password -->
												<div class="form-group">
													<label for="Passwordfor">User Password</label>
													<input type="password" class="form-control" id="passwordid" name="password">
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
					</ul>		   <!-- LOGIN END -->
		</section>	   
		<!-- sign up MODAL -->
		<?php
			// SIGNUP START
			if(isset($_POST["Sign_up"]))
			{
			// if the user types in the sign up the values are stored in these variables
			$UserFullName=$_POST["User_Full_Name"];
			$UserName=$_POST["User_Name"];
			$UserEmail=$_POST["User_Email"];
			$UserMobile_Number=$_POST["User_Mobile_Number"];
			$UserPassword=$_POST["User_Password"];
			
			// Password stuff
			$options=['cost' => 12,];
			$HPassword=password_hash($UserPassword,PASSWORD_BCRYPT, $options);
			
			include_once"config/db.php";
			//Query for insertion into the DataBase
			$sql="INSERT INTO user (fullName,UserName,UserEmail,UserMobileNumber,LoginPassword) VALUES(:fname,:uname,:uemail,:umobile,:upassword)";
		
			//prepare DB
			$query=$dbh->prepare($sql);
			
			//BIND PARAMETER
			$query->bindParam(":fname",$UserFullName,PDO::PARAM_STR);
			$query->bindParam(":uname",$UserName,PDO::PARAM_STR);
			$query->bindParam(":uemail",$UserEmail,PDO::PARAM_STR);
			$query->bindParam(":umobile",$UserMobile_Number,PDO::PARAM_STR);
			$query->bindParam(":upassword",$HPassword,PDO::PARAM_STR);
			
			//execute query
			if($query->execute())
				{
					echo "You have successfully signed up";
				}
			}
		?>
			<form method="post">
				<div id="signupModal" class="modal fade" role="dialog">
					<div class="modal-dialog">
							<!-- Modal content-->
						 <div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal">&times;</button>
									<h4 class="modal-title">Sign Up at no Cost</h4>
								</div>
									<!-- MODAL BODY -->
									<div class="modal-body">
									<!-- full name -->
									<div class="form-group">
										<label for="full_name">Name:</label>
										<input type="text" class="form-control" id="Full_Name" name="User_Full_Name" required pattern="[a-zA-Z0-9]+" placeholder="Name">
									</div>
									<!-- user name -->
									<div class="form-group">
										<label for="user_name">User Name:</label>
										<input type="text" class="form-control" name="User_Name" id="user_name" required placeholder="Pick a User name">
									</div>
									<!-- email -->
									<div class="form-group">
										<label for="user_email">Email:</label>
										<input type="text" class="form-control" name="User_Email" id="user_email" required>
									</div>
									<!-- mobile -->
									<div class="form-group">
										<label for="user_mobile">Mobile Number:</label>
										<input type="text" class="form-control" name="User_Mobile_Number" id="user_mobile" required>
									</div>
									<!-- password -->
									<div class="form-group">
										<label for="pwd">Password:</label>
										<input type="password" name="User_Password" class="form-control" id="pwd" required>
									</div>
								</div>
								<div class="modal-footer">
									<button type="submit" name="Sign_up" class="btn btn-success" >Sign Up!!</button>
									<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
								</div>
								<!--END MODAL BODY -->
								<!--END Modal content-->
						</div>
					</div>
				</div>
			 </form>
		  <!--END  SIGN UP MODAL -->
		<!-- LINK IN DESCRIPTION -->
		<section class="description">
			<p>Ad-Space For Rent, Here.</p>
		</section>
		<!-- LINK IN DESCRIPTION -->
		<!-- FOOTER -->
		<section class="footer">
			<div class="footer">
				<div class="footer-content">
					<div class="footer-section about">
						<h2>Gudo inc.</h2>
						<p>The Visual Assistant</p>
						<div class="contact">
							<h3>Contact Us</h3>
							<span><i class="fas fa-envelope"> &nbsp; gudoteam@gudoassistant.com</i></span>
						</div>
					</div>
					<div class="footer-section contact-form">
						<br>
						<!-- form for message submissions (DOESNT WORK) -->
						<!-- <form action="layout_one.html" method="post">
							 <input type="email" name="email" class="text-input contact-input" placeholder="Your Email address">
							 <input name="message" class="text-input contact-input" placeholder="Your message"></input>
							<button type="submit" class="btn btn-big"></button>
						</form> -->
					 </div>
				</div>
					
				<div class="footer-bottom">
							&copy; Gudo | Designed by GWG and Charles 
				 </div>
			</div>
		</section>
		<!--END of FOOTER -->
		<!-- LIBRARY -->
		<section class="library">
			<h2 align="center">Your Library</h2>
			<div class="library_gallery"></div>
		</section>
		<!--END of LIBRARY -->
		<div class="image">
		</div>
	</div>
</body>
</html>