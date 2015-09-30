package vn.com.tma.hrm.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
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
import vn.com.tma.hrm.entities.SprintState;
import vn.com.tma.hrm.services.ProjectService;
import vn.com.tma.hrm.services.SprintService;

@Controller
@RequestMapping("/sprint")
public class SprintController {

    @Autowired
    private SprintService sprintService;

    @Autowired
    private ProjectService projectService;

    private static final Logger logger = LoggerFactory.getLogger(SprintController.class);

    /*
     * @Autowired private Validator validator;
     */

    /*
     * @InitBinder private void initBinder(WebDataBinder binder) { binder.setValidator(validator); }
     */
    @ModelAttribute("sprint")
    public Sprint createSprintModel() {
        // ModelAttribute value should be same as used in the empSave.jsp
        return new Sprint();
    }

    @RequestMapping(value = { "/getall" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAll() {
        List<Sprint> sprints = sprintService.getAll();
        String jsonSprints = null;
        String error = null;
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonSprints = ow.writeValueAsString(sprints);
        } catch (JsonProcessingException e) {
            error = e.toString();
        } catch (Exception e) {
            error = e.toString();
        }
        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>("{ \"sprints\" : " + jsonSprints + " } ", HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> create(@RequestBody String jsonString, HttpServletRequest request) {
        // convert JSON string to Sprint Object

        ObjectMapper mapper = new ObjectMapper();
        Sprint newSprint = null;
        String message = null;
        String error = null;
        try {
            // read from json string
            newSprint = mapper.readValue(jsonString, Sprint.class);

            Sprint duplicatedSprint = sprintService.getByProjectAndName(newSprint.getProject(), newSprint.getName());
            if (duplicatedSprint != null) {
                error = newSprint.getName() + " was duplicated.";
            } else {
                sprintService.create(newSprint);
                message = newSprint.getName() + " was successfully created.";
            }
        } catch (JsonProcessingException e) {
            error = e.toString();
        } catch (IOException e) {
            error = e.toString();
        }
        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>("{ \"success\" : \"" + message + " \"} ", HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getByID/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> getByID(@PathVariable int id) {
        Sprint sprint = sprintService.getByID(id);
        String jsonSprint = null;
        String error = null;
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonSprint = ow.writeValueAsString(sprint);
        } catch (JsonProcessingException e) {
            error = e.toString();
        } catch (Exception e) {
            error = e.toString();
        }
        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>("{ \"sprint\" : " + jsonSprint + " } ", HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> editSprint(@RequestBody String[] jsonSprint) throws Exception {

        // sprintService.update(sprint);
        String message = "Sprint was successfully updated.";

        // return new ResponseEntity<String>("{ \"message\" : " + new JSONSerializer().serialize(message) + " } " ,
        // HttpStatus.ACCEPTED);
        return null;

    }

    @RequestMapping(value = "/getByProjectID/{projectId}", method = RequestMethod.GET)
    @ResponseBody
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
    @ResponseBody
    public ResponseEntity<String> deleteSprint(@PathVariable int id) throws Exception {

        Sprint sprint = sprintService.delete(id);
        System.out.println(sprint.getName());

        String message = "Sprint " + sprint.getName() + " was successfully deleted.";

        // return new ResponseEntity<String>("{ \"message\" : " + new JSONSerializer().serialize(message) + " } " ,
        // HttpStatus.ACCEPTED);
        return null;
    }

}