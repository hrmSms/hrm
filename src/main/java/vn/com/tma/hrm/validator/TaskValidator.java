package vn.com.tma.hrm.validator;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import vn.com.tma.hrm.entities.Task;
import vn.com.tma.hrm.services.TaskService;

@Service
public class TaskValidator implements Validator {

    @Autowired
    TaskService taskService;

    @Autowired
    MessageSource messageSource;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.equals(Task.class);
    }

    @Override
    public void validate(Object obj, Errors errors) {
    	Task newTask = (Task) obj;
        
        // validate name
        if (!errors.hasFieldErrors("name")) {
            Task duplicate = taskService.getByUserStoryAndName(newTask.getUserStoryId(), newTask.getName());
            if (duplicate!=null && (newTask.getId()==null || duplicate.getId().intValue() != newTask.getId().intValue())) {
                errors.rejectValue("name", messageSource.getMessage("name.duplicate", new Object[] { newTask.getName() }, Locale.US),"Name is duplicated.");
            }
        }

    }

}