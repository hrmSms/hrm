package vn.com.tma.hrm.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.validation.Valid;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.entities.UserStoryState;
import vn.com.tma.hrm.entities.UserStoryStatus;
import vn.com.tma.hrm.model.UserStoryInputForm;
import vn.com.tma.hrm.services.ProjectService;
import vn.com.tma.hrm.services.SprintService;
import vn.com.tma.hrm.services.UserService;
import vn.com.tma.hrm.services.UserStoryService;
import vn.com.tma.hrm.services.UserStoryStateService;
import vn.com.tma.hrm.services.UserStoryStatusService;

@Controller
@RequestMapping(value = "/userstory")
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
	
	@Autowired
    private MessageSource messageSource;
	
	@RequestMapping(value="/getrelateddata/{projectId}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> getAllRelatedData(@PathVariable int projectId) {
		String error = null;
		String jsonUsStates = null;
        String jsonUsStatus = null;
        String jsonSprints = null;
        String jsonUsers = null;
        String jsonProject = null;
        
		Project project = projectService.getByID(projectId);
        if (project == null) {
            error = "Project doesn't exist";
        } else {
        	List<UserStoryState> usStates = usStateService.getAll();
    		List<UserStoryStatus> usStatus = usStatusService.getAll();
    		List<Sprint> sprints = sprintService.getByProject(project);
    		Collection<User> users = userService.getAllUsers();
    		
    		logger.debug("go to get related data of us");
	        
	        try {
	            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	            jsonUsStates = ow.writeValueAsString(usStates);
	            jsonUsStatus = ow.writeValueAsString(usStatus);
	            jsonSprints = ow.writeValueAsString(sprints);
	            jsonUsers = ow.writeValueAsString(users);
	            jsonProject = ow.writeValueAsString(project);
	            
	            logger.debug("jsonUsStates: " + jsonUsStates);
	            logger.debug("jsonUsStatus: " + jsonUsStatus);
	            logger.debug("jsonSprints: " + jsonSprints);
	            logger.debug("jsonUsers: " + jsonUsers);
	            
	        } catch (JsonProcessingException e) {
	            // TODO Auto-generated catch block
	        	error = e.toString();
	            System.out.println(e.toString());
	        } catch (Exception e) {
	        	error = e.toString();
	        }
        	
        }
        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>(" { \"usStates\" : " + jsonUsStates +
        		" , \"usStatus\" : " + jsonUsStatus +
        		" , \"sprints\" : " + jsonSprints +
        		" , \"users\" : " + jsonUsers +
        		" , \"project\" : " + jsonProject +
        		"} ", HttpStatus.ACCEPTED);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseBody
    public ResponseEntity<String> create(@Valid @RequestBody UserStoryInputForm usForm, BindingResult result) {
		logger.debug("going to create UserStory");
		logger.debug("usForm.state: " + usForm.getUserStoryState());
        String successString = null;
        String errorString = null;
        Map<String, String> error = new HashMap<String, String>();
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            if (result.hasErrors()) {
                for (FieldError errorMessage : result.getFieldErrors()) {
                	logger.debug("error message: " + errorMessage);
                    error.put(errorMessage.getField(), errorMessage.getCode());
                }
                errorString = ow.writeValueAsString(error);
                return new ResponseEntity<String>("{ \"error\" : " + errorString + " } ", HttpStatus.OK);
            } else {
                UserStory us = usService.create(usForm);
                String message = messageSource.getMessage("create.success", new Object[] { us.getName() }, Locale.US);
                successString = ow.writeValueAsString(message);
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("{ \"success\" : " + successString + "} ", HttpStatus.CREATED);
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
