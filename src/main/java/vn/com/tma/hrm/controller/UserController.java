package vn.com.tma.hrm.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.services.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Autowired
    private UserService userService;
	
	@RequestMapping(value = { "/getall" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAll() {
        List<User> users = userService.getAll();
        String jsonUsers = null;
        String error = null;
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonUsers = ow.writeValueAsString(users);
        } catch (JsonProcessingException e) {
            error = e.toString();
        } catch (Exception e) {
            error = e.toString();
        }
        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>("{ \"users\" : " + jsonUsers + " } ", HttpStatus.ACCEPTED);
    }
}