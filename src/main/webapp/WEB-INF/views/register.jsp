<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>   
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
		<title>Register - HRM</title>

		<meta name="description" content="User login page" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<!-- bootstrap & fontawesome -->
		<link rel="stylesheet" href="./assets/css/bootstrap.min.css" />
		<link rel="stylesheet" href="./assets/css/font-awesome.min.css" />

		<!-- text fonts -->
		<link rel="stylesheet" href="./assets/css/ace-fonts.min.css" />
		
		<!-- custom CSS -->
		<link rel="stylesheet" href="./assets/css/custom.css" />

		<!-- ace styles -->
		<link rel="stylesheet" href="./assets/css/ace.min.css" />

		<!--[if lte IE 9]>
			<link rel="stylesheet" href="./assets/css/ace-part2.min.css" />
		<![endif]-->
		<link rel="stylesheet" href="./assets/css/ace-rtl.min.css" />

		<!--[if lte IE 9]>
		  <link rel="stylesheet" href="./assets/css/ace-ie.min.css" />
		<![endif]-->

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

		<!--[if lt IE 9]>
		<script src="./assets/js/html5shiv.min.js"></script>
		<script src="./assets/js/respond.min.js"></script>
		<![endif]-->
		<style>
            .errMsg {
                color:red;
                font-size: 13px;
            }
        </style>
	</head>

	<body class="login-layout" data-ng-app="myApp">
		<div class="main-container">
			<div class="main-content">
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="login-container">
							<div class="center">
								<h1>
									<img src="./assets/images/logo.png">
									<span class="red">HRM</span>
									<span class="white" id="id-text2">Application</span>
								</h1>
								<h4 class="blue" id="id-company-text">&copy; SMS</h4>
							</div>

							<div class="space-6"></div>

							<div class="position-relative">
								<div id="signup-box" class="signup-box widget-box no-border visible">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header green lighter bigger">
												<i class="ace-icon fa fa-users blue"></i>
												New User Registration
											</h4>
											
											<div class="space-6"></div>
											<p> Enter your details to begin: </p>

											<form name="regForm" data-ng-submit="submit()" data-ng-controller="regController">
												<p class="errMsg">{{message}}</p>
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="email" class="form-control" placeholder="Email" 
															data-ng-model="email"  data-ng-blur="validateEmail()" data-ng-required="true" data-ng-change="clrEmMsg()"/>
															<i class="ace-icon fa fa-envelope"></i>
															<span class="errMsg" data-ng-show="regForm.email.$error.isValidated && !regForm.email.$pristine">Email already exists</span>
															<span class="errMsg" data-ng-show="regForm.email.$error.isValid && !regForm.email.$pristine">Email is NOT valid</span>
															<span class="errMsg" data-ng-show="regForm.email.$error.required && !regForm.email.$pristine">Please enter your email</span>
														</span>
													</label>
													
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" name="username" class="form-control" placeholder="Username" 
																	data-ng-model="username" data-ng-blur="validateUsername()" data-ng-required="true" data-ng-change="clrUsrMsg()"/>
															<i class="ace-icon fa fa-user"></i>
															<span class="errMsg" data-ng-show="regForm.username.$error.isValidated && !regForm.username.$pristine">Username already exists</span>
															<span class="errMsg" data-ng-show="regForm.username.$error.isValid && !regForm.username.$pristine">Username is NOT valid</span>
															<span class="errMsg" data-ng-show="regForm.username.$error.required && !regForm.username.$pristine">Please enter your username</span>
														</span>
													</label>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" name="password" class="form-control" placeholder="Password" data-ng-model="password" data-ng-required="true" data-ng-min-length="3" data-ng-max-length="20"/>
															<i class="ace-icon fa fa-lock"></i>
															<span class="errMsg" data-ng-show="regForm.password.$error.required && !regForm.password.$pristine">Please enter your password</span>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" name="repeatpassword" class="form-control" placeholder="Repeat password" data-ng-model="repeatpassword" data-match="password" data-ng-required="true"/>
															<i class="ace-icon fa fa-retweet"></i>
															<span class="errMsg" data-ng-show="regForm.repeatpassword.$error.match && !regForm.repeatpassword.$pristine && !regForm.password.$error.required">Passwords do not match!</span>
															
														</span>
													</label>

													<label class="block">
														<input type="checkbox" class="ace" data-ng-model="agreement" data-ng-required="true"/>
														<span class="lbl">
															I accept the
															<a href="#">User Agreement</a>
														</span>
													</label>

													<div class="space-24"></div>

													<div class="clearfix">
														<button type="reset" class="width-30 pull-left btn btn-sm">
															<i class="ace-icon fa fa-refresh"></i>
															<span class="bigger-110">Reset</span>
														</button>

														<button type="submit" data-ng-disabled="regForm.$invalid" class="width-65 pull-right btn btn-sm btn-success">
															<span class="bigger-110">Register</span>

															<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
														</button>
													</div>
												</fieldset>
											</form>
										</div>

										<div class="toolbar center">
											<a href="<c:url value="/login"/>" data-target="#login-box" class="back-to-login-link">
												<i class="ace-icon fa fa-arrow-left"></i>
												Back to login
											</a>
										</div>
									</div><!-- /.widget-body -->
								</div><!-- /.signup-box -->
							</div><!-- /.position-relative -->

							<div class="navbar-fixed-top align-right">
								<br />
								&nbsp;
								<a id="btn-login-dark" href="#">Dark</a>
								&nbsp;
								<span class="blue">/</span>
								&nbsp;
								<a id="btn-login-blur" href="#">Blur</a>
								&nbsp;
								<span class="blue">/</span>
								&nbsp;
								<a id="btn-login-light" href="#">Light</a>
								&nbsp; &nbsp; &nbsp;
							</div>
						</div>
					</div><!-- /.col -->
				</div><!-- /.row -->
			</div><!-- /.main-content -->
		</div><!-- /.main-container -->

		<!-- basic scripts -->

		<!--[if !IE]> -->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='./assets/js/jquery.min.js'>"+"<"+"/script>");
		</script>

		<!-- <![endif]-->

		<!--[if IE]>
		<script type="text/javascript">
		 window.jQuery || document.write("<script src='./assets/js/jquery1x.min.js'>"+"<"+"/script>");
		</script>
		<![endif]-->
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='./assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>

        <script src="./assets/js/app/angular.min.js"></script>
        <script src="./assets/js/app/ng/pages/reg-controller.js"></script>
        <script src="./assets/js/app/angular-validation-match.js"></script>
        
		<!-- inline scripts related to this page -->
		<!-- <script>
        	$("#email").attr(''); 
		</script>
		 -->
		<script type="text/javascript">
			
			//you don't need this, just used for changing background
			jQuery(function($) {
			 $('#btn-login-dark').on('click', function(e) {
				$('body').attr('class', 'login-layout');
				$('#id-text2').attr('class', 'white');
				$('#id-company-text').attr('class', 'blue');
				
				e.preventDefault();
			 });
			 $('#btn-login-light').on('click', function(e) {
				$('body').attr('class', 'login-layout light-login');
				$('#id-text2').attr('class', 'grey');
				$('#id-company-text').attr('class', 'blue');
				
				e.preventDefault();
			 });
			 $('#btn-login-blur').on('click', function(e) {
				$('body').attr('class', 'login-layout blur-login');
				$('#id-text2').attr('class', 'white');
				$('#id-company-text').attr('class', 'light-blue');
				
				e.preventDefault();
			 });
			 
			});
		</script>
	</body>
</html>
