package vn.com.tma.hrm.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.SprintState;
import vn.com.tma.hrm.services.SprintService;

@Controller
@RequestMapping("/sprint")
public class SprintController {

    @Autowired
    private SprintService sprintService;

    @RequestMapping(value = { "/getall" }, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAll() {
        List<Sprint> sprints = sprintService.getAll();
        String jsonSprints = null;
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            jsonSprints = ow.writeValueAsString(sprints);
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

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String newSprint() {
        return "sprint/create";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<String> create(@RequestBody String jsonString, HttpServletRequest request) {
        ObjectMapper mapper = new ObjectMapper();
        Sprint newSprint=null;
        try {
            //read from string variable
            newSprint = mapper.readValue(jsonString, Sprint.class);
        } catch (JsonParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        System.out.println("Name:"+newSprint.getName()+", Vill."+ newSprint.getSprintstate().getName());
        
        //String jsonSprint = jsonString[0];
        //Sprint newSprint = new JSONDeserializer<Sprint>().use(null, Sprint.class).deserialize(jsonSprint);

        /*
         * String jsonProject = jsonString[1]; Project project = new JSONDeserializer<Project>().use(null,
         * Project.class).deserialize(jsonProject);
         */

        //String jsonSprintState = jsonString[2];
        // Sprintstate sprintState = new JSONDeserializer<Sprintstate>().deserialize(jsonSprintState);

        // newSprint.setProject(project);
        // newSprint.setSprintstate(sprintState);
        // sprintService.create(newSprint);

        // String message = "New Sprint: " + newSprint.getName() +" was successfully created.";

        // return new ResponseEntity<String>("{ \"message\" : " + new JSONSerializer().serialize(message) + " } " ,
        // HttpStatus.ACCEPTED);
        return null;
    }

    @RequestMapping(value = "/getByID/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> getByID(@PathVariable int id) {
        Sprint sprint = sprintService.getByID(id);
        // return new ResponseEntity<String>("{ \"sprint\" : " + new JSONSerializer().serialize(sprint) + " } " ,
        // HttpStatus.ACCEPTED);
        return null;
    }

    @RequestMapping(value = "/edit", method = RequestMethod.GET)
    public ModelAndView editSprint() {
        ModelAndView mav = new ModelAndView("sprint/edit");
        return mav;
    }

    @RequestMapping(value = "/edit/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> editSprint(@RequestBody String[] jsonSprint) throws Exception {

        // sprintService.update(sprint);
        String message = "Sprint was successfully updated.";

        // return new ResponseEntity<String>("{ \"message\" : " + new JSONSerializer().serialize(message) + " } " ,
        // HttpStatus.ACCEPTED);
        return null;

    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public ResponseEntity<String> deleteSprint(@PathVariable int id) throws Exception {

        Sprint sprint = sprintService.delete(id);
        System.out.println(sprint);

        String message = "Sprint " + sprint.getName() + " was successfully deleted.";

        // return new ResponseEntity<String>("{ \"message\" : " + new JSONSerializer().serialize(message) + " } " ,
        // HttpStatus.ACCEPTED);
        return null;
    }

}