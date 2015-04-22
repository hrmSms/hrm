package vn.com.tma.hrm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TaskController {

	@RequestMapping("/home")
	public String home() {
		return "index";
	}

}