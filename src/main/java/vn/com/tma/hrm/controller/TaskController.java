package vn.com.tma.hrm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/task")
public class TaskController {

	  @RequestMapping(method = RequestMethod.GET)
	  public String viewApplication() {
	    return "index";
	  }
}