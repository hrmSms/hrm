# hrm
Requires:
	1. Java 7 or above
	2. Maven
	3. Node JS
	4. Git
	5. Bower
	6. IDE: eclipse, ..

Action:
	1. Change Computer name
	2. Set static IP


Local Tomcat server:
	Path: C:\Program Files\Apache Software Foundation\Tomcat 8.0
	HTTP port: 8081
	Username: admin	
	Password: admin
	Roles: admin-gui,manager-gui
	
Local Tomcat for Eclipse:
	Path: C:\Tomcat 7.0
	
WampServer:
	
Bower download lib:
	1. cd "C:\Users\GODFATHER VMW\git\hrm" 
	2. bower intall
	
HRM Ecipse package
	Maven run with gold: clean install package
	
HRM Ecipse debug, run:
	Right click run on server
	
Server:
	SSH:
		+ IP: 192.168.100.190:22
		+ Account: sysadmin/12345678@X
	Tomcat dir: /usr/local/tomcat8/apache-tomcat-8.0.24
	Web UI:
		+ Jenkins: 192.168.100.190:8080
		+ Tomcat: 192.168.100.190
	MySQL:
		+ Server: 192.168.100.190:3306
		+ Account: admin/12345678@X
