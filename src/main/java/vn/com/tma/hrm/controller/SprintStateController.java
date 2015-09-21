package vn.com.tma.hrm.controller;

import java.io.IOException;
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

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.SprintState;
import vn.com.tma.hrm.services.SprintStateService;

@Controller
@RequestMapping("/sprintState")
public class SprintStateController {

	@Autowired
	private SprintStateService sprintStateService;

	@RequestMapping(value = { "/getall"}, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<String> getAll() {
		List<SprintState> sprintStates = sprintStateService.getAll();
	        String jsonSprintStates = null;
	        try {
	            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	            jsonSprintStates = ow.writeValueAsString(sprintStates);
	        } catch (JsonProcessingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            System.out.println(e.toString());
	        } catch (IOException e) {
	            e.printStackTrace();
	            System.out.println(e.toString());
	        }
	        return new ResponseEntity<String>("{ \"sprintStates\" : " + jsonSprintStates + " } ", HttpStatus.ACCEPTED);
	}
}