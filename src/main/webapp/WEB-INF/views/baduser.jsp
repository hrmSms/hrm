<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8" />
<link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
<title><spring:message code="label.badUser.title"></spring:message></title>

<meta name="description" content="User login page" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<!-- bootstrap & fontawesome -->
<link rel="stylesheet" href="./assets/css/bootstrap.min.css" />
<link rel="stylesheet" href="./assets/css/font-awesome.min.css" />

<!-- text fonts -->
<link rel="stylesheet" href="./assets/css/ace-fonts.min.css" />

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
</head>
<body>
	<div class="container">
		<h1 class="alert alert-info"><%= request.getAttribute("message") %>
		</h1>
		<br> 
		<a class="btn btn-default"
			href="<c:url value="/registration" />"><spring:message
				code="label.form.loginSignUp"></spring:message></a> 
				
	</div>
</body>
</html>