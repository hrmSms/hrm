package vn.com.tma.hrm.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
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

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.UserStoryState;
import vn.com.tma.hrm.entities.UserStoryStatus;
import vn.com.tma.hrm.services.ProjectService;
import vn.com.tma.hrm.services.SprintService;
import vn.com.tma.hrm.services.UserService;
import vn.com.tma.hrm.services.UserStoryService;
import vn.com.tma.hrm.services.UserStoryStateService;
import vn.com.tma.hrm.services.UserStoryStatusService;

@Controller
public class UserStoryController {

	private static final Logger logger = LogManager.getLogger(UserStoryController.class);
	
	@Autowired
	UserStoryStateService usStateService;
	
	@Autowired
	UserStoryStatusService usStatusService;
	
	@Autowired
	UserStoryService usService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	SprintService sprintService;
	
	@Autowired
	ProjectService projectService;
	
	@RequestMapping(value="/us/create/relateddata", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> getAllRelatedData() {
		List<UserStoryState> usStates = usStateService.getAll();
		List<UserStoryStatus> usStatus = usStatusService.getAll();
		List<Sprint> sprints = sprintService.getByProject(project);
		Collection<User> users = userService.getAllUsers();

		logger.debug("go to get related data of us");
	        String jsonUsStates = null;
	        String jsonUsStatus = null;
	        String jsonSprints = null;
	        String jsonUsers = null;
	        
	        try {
	            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	            jsonUsStates = ow.writeValueAsString(usStates);
	            jsonUsStatus = ow.writeValueAsString(usStatus);
	            jsonSprints = ow.writeValueAsString(sprints);
	            jsonUsers = ow.writeValueAsString(users);
	            
	            logger.debug("jsonUsStates: " + jsonUsStates);
	            logger.debug("jsonUsStatus: " + jsonUsStatus);
	            logger.debug("jsonSprints: " + jsonSprints);
	            logger.debug("jsonUsers: " + jsonUsers);
	            
	        } catch (JsonProcessingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            System.out.println(e.toString());
	        } catch (IOException e) {
	            e.printStackTrace();
	            System.out.println(e.toString());
	        }
	        logger.debug("json string: " + "{ \"usStates\" : " + jsonUsStates + 
	        		" , \"usStatus\" " + jsonUsStatus +
	        		" , \"sprints\" " + jsonSprints +
	        		" , \"users\" " + jsonUsers +
	        		"} ");
	        return new ResponseEntity<String>("{ \"usStates\" : " + jsonUsStates + 
	        		" , \"usStatus\" : " + jsonUsStatus +
	        		" , \"sprints\" : " + jsonSprints +
	        		" , \"users\" : " + jsonUsers +
	        		"} ", HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value="/getAllUsStates", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> getAllStates() {
		List<UserStoryState> usStates = usStateService.getAll();
	        String jsonUsStates = null;
	        try {
	            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	            jsonUsStates = ow.writeValueAsString(usStates);
	            logger.debug("jsonUsStates: " + jsonUsStates);
	        } catch (JsonProcessingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            System.out.println(e.toString());
	        } catch (IOException e) {
	            e.printStackTrace();
	            System.out.println(e.toString());
	        }
	        return new ResponseEntity<String>("{ \"usStates\" : " + jsonUsStates + " } ", HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value="/getAllUsStatus", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> getAllStatus() {
		List<UserStoryStatus> usStatus = usStatusService.getAll();
	        String jsonUsStatus = null;
	        try {
	            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	            jsonUsStatus = ow.writeValueAsString(usStatus);
	            logger.debug("jsonUsStatus: " + jsonUsStatus);
	        } catch (JsonProcessingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            System.out.println(e.toString());
	        } catch (IOException e) {
	            e.printStackTrace();
	            System.out.println(e.toString());
	        }
	        return new ResponseEntity<String>("{ \"usStatus\" : " + jsonUsStatus + " } ", HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value="/getAllSprints", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> getAllSprints() {
		List<Sprint> sprints = sprintService.getAll();
	        String jsonSprints = null;
	        try {
	            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	            jsonSprints = ow.writeValueAsString(sprints);
	            logger.debug("jsonSprints: " + jsonSprints);
	        } catch (JsonProcessingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            System.out.println(e.toString());
	        } catch (IOException e) {
	            e.printStackTrace();
	            System.out.println(e.toString());
	        }
	        return new ResponseEntity<String>("{ \"sprints\" : " + jsonSprints + " } ", HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value="/getAllUsers", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> getAllUsers() {
		Collection<User> users = userService.getAllUsers();
	        String jsonUsers = null;
	        try {
	            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	            jsonUsers = ow.writeValueAsString(users);
	            logger.debug("jsonSprints: " + jsonUsers);
	        } catch (JsonProcessingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            System.out.println(e.toString());
	        } catch (IOException e) {
	            e.printStackTrace();
	            System.out.println(e.toString());
	        }
	        return new ResponseEntity<String>("{ \"users\" : " + jsonUsers + " } ", HttpStatus.ACCEPTED);
	}
	
	
}
