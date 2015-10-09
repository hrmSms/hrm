package vn.com.tma.hrm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.services.ProjectService;
import vn.com.tma.hrm.services.SprintService;
import vn.com.tma.hrm.validator.SprintValidator;

@RestController
@RequestMapping("/sprint")
public class SprintController {

    @Autowired
    private SprintService sprintService;

    @Autowired
    private SprintValidator sprintValidator;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MessageSource messageSource;

    private static final Logger logger = LoggerFactory.getLogger(SprintController.class);

    /*
     * @Autowired private Validator validator;
     */

    @InitBinder
    private void initBinder(WebDataBinder binder) {
        binder.addValidators(sprintValidator);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<String> create(@Valid @RequestBody Sprint newSprint, BindingResult result) {

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
                sprintService.create(newSprint);
                String message = messageSource.getMessage("create.success", new Object[] { newSprint.getName() }, Locale.US);
                successString = ow.writeValueAsString(message);
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("{ \"success\" : " + successString + "} ", HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getByID/{id}", method = RequestMethod.GET)
    public Sprint getByID(@PathVariable int id) throws MethodArgumentNotValidException{
        Sprint sprint = sprintService.getByID(id);
        return sprint;
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity<String> editSprint(@Valid @RequestBody Sprint updateSprint, BindingResult result) throws Exception {
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
                sprintService.update(updateSprint);
                String message = messageSource.getMessage("update.success", new Object[] { updateSprint.getName() }, Locale.US);
                successString = ow.writeValueAsString(message);
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("{ \"success\" : " + successString + "} ", HttpStatus.CREATED);

    }

    @RequestMapping(value = "/getByProjectID/{projectId}", method = RequestMethod.GET)
    public ResponseEntity<String> getByProjectID(@PathVariable int projectId) {
        String jsonSprint = null;
        String error = null;
        Project project = projectService.getByID(projectId);
        if (project == null) {
            error = "Project doesn't exist";
        } else {
            List<Sprint> sprints = sprintService.getByProject(project);
            try {
                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                jsonSprint = ow.writeValueAsString(sprints);
            } catch (JsonProcessingException e) {
                error = e.toString();
            } catch (Exception e) {
                error = e.toString();
            }
        }

        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>("{ \"sprints\" : " + jsonSprint + " } ", HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> deleteSprint(@PathVariable int id) throws Exception {
        String message = null;
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            Sprint sprint = sprintService.delete(id);
            message = messageSource.getMessage("delete.success", new Object[] { sprint.getName() }, Locale.US);
            message = ow.writeValueAsString(message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<String>("{ \"success\" : " + message + "} ", HttpStatus.OK);
    }

}