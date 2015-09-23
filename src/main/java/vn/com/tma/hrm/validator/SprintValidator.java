package vn.com.tma.hrm.validator;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.repository.SprintRepository;

public class SprintValidator implements Validator {

 /*   @Autowired
    SprintRepository sprintRepository;*/

    @Override
    public boolean supports(Class<?> paramClass) {
        return Sprint.class.equals(paramClass);
    }

    @Override
    public void validate(Object obj, Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "name.required");
        System.out.println("validator create");
        System.out.println("name.required");
        Sprint newSprint = (Sprint) obj;
       /* List<Sprint> sprints = sprintRepository.getByProjectID(newSprint.getProjectID());
        for (Sprint sprint : sprints) {
            if (newSprint.getName().equals(sprint.getName())) {
                errors.rejectValue("name", "name.duplicate", new Object[] { "'name'" }, "name is already existed!");
            }
        }*/
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "startDate", "startDate.required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "endDate", "endDate.required");
        if (newSprint.getStartDate().after(newSprint.getEndDate())
                || newSprint.getStartDate().equals(newSprint.getEndDate())) {
            errors.rejectValue("startDate", "startDate.error");
            System.out.println("startDate.error");
            errors.rejectValue("endDate", "endDate.error");
        }
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "projectID", "project.required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "sprintstate", "sprintstate.required");

    }
}