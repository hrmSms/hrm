package vn.com.tma.hrm.controller;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/login")
public class LoginController {
	
    @RequestMapping(method=RequestMethod.POST)
    public String login(@RequestParam(value="username", required=true) String username, 
    					   @RequestParam(value="password", required=true) String password, Model model) {
    	System.out.println("username: " + username);
    	System.out.println("password: " + password);
    	if(username.equals("admin") && password.equals("123") ){
    		return "home";
    	}
    	return "login";	
    }

}