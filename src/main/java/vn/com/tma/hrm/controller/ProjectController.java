package vn.com.tma.hrm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import vn.com.tma.hrm.entities.Project;
import vn.com.tma.hrm.services.ProjectService;

@Controller
@RequestMapping("/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @RequestMapping(value = { "/getall" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAll() {
        List<Project> projects = projectService.getAll();
        String jsonprojects = null;
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonprojects = ow.writeValueAsString(projects);
        } catch (JsonProcessingException e) {
            System.out.println(e.toString());
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return new ResponseEntity<String>("{ \"projects\" : " + jsonprojects + " } ", HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/getByID/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<String> getByID(@PathVariable int id) {
        Project project = projectService.getByID(id);
        String jsonSprint = null;
        String error = null;
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonSprint = ow.writeValueAsString(project);
        } catch (JsonProcessingException e) {
            error = e.toString();
        } catch (Exception e) {
            error = e.toString();
        }
        if (error != null) {
            return new ResponseEntity<String>("{ \"error\" : \"" + error + " \"} ", HttpStatus.OK);
        }
        return new ResponseEntity<String>("{ \"project\" : " + jsonSprint + " } ", HttpStatus.ACCEPTED);
    }
}