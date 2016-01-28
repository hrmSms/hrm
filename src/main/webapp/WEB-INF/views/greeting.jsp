<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!-- <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon"> -->
<title>Welcome - HRM</title>
</head>
<body>
<c:if test="${not empty registrationForm}">
     <p>Hello ${registrationForm.username} !</p>
</c:if>
    <p>Your registration has been successful. A link will be sent to you for activation. Please check your mail.</p>
</body>
</html>