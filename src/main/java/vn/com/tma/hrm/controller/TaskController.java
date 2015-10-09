package vn.com.tma.hrm.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.services.TaskService;
import vn.com.tma.hrm.services.UserStoryService;

@Controller
@RequestMapping("/task")
public class TaskController {
	
	@Autowired
    private TaskService taskService;

	@Autowired
    private UserStoryService usService;
	
	@RequestMapping(value = { "/getall" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAll() {
        List<Task> tasks = taskService.getAll();
        String jsonTasks = null;
        String error = null;
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonTasks = ow.writeValueAsString(tasks);
        } catch (JsonProcessingException e) {
            error = e.toString();
        } catch (Exception e) {
            error = e.toString();
        }
        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>("{ \"tasks\" : " + jsonTasks + " } ", HttpStatus.ACCEPTED);
    }
	
	public ResponseEntity<String> create(@Valid @RequestBody Task newTask, BindingResult result) {

        String successString = null;
        String errorString = null;
        Map<String, String> error = new HashMap<String, String>();
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            if (result.hasErrors()) {
                for (FieldError errorMessage : result.getFieldErrors()) {
                    error.put(errorMessage.getField(), errorMessage.getCode());
                }
                errorString = ow.writeValueAsString(error);
                return new ResponseEntity<String>("{ \"error\" : " + errorString + " } ", HttpStatus.OK);
            } else {
            	taskService.create(newTask);
                String message = newTask.getName() + " was successfully created.";
                successString = ow.writeValueAsString(message);
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("{ \"success\" : " + successString + "} ", HttpStatus.CREATED);
    }

	public ResponseEntity<String> getByID(@PathVariable int id) {
        Task task = taskService.getByID(id);
        String jsonTask = null;
        String error = null;
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonTask = ow.writeValueAsString(task);
        } catch (JsonProcessingException e) {
            error = e.toString();
        } catch (Exception e) {
            error = e.toString();
        }
        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>("{ \"task\" : " + jsonTask + " } ", HttpStatus.ACCEPTED);
    }

	@RequestMapping(value = "/getByUserStoryID/{usId}", method = RequestMethod.GET)
    @ResponseBody
	public List<Task> getByUsID(@PathVariable int usId) {
        String error = null;
        List<Task> tasks = null; 
        UserStory us = usService.getByID(usId);
        if (us == null) {
            error = "UserStory doesn't exist";
        } else {
            //List<Task> tasks = taskService.getByUserStory(us);
            tasks = taskService.getByUserStory(us);
        }

        return tasks;
    }
	
	@RequestMapping(method = RequestMethod.GET)
	public String viewApplication() {
		System.out.print("\nCall task");
		return "home";
	}
}