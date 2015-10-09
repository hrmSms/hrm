package vn.com.tma.hrm.validator;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.services.SprintService;

@Service
public class SprintValidator implements Validator {

    @Autowired
    SprintService sprintService;

    @Autowired
    MessageSource messageSource;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.equals(Sprint.class);
    }

    @Override
    public void validate(Object obj, Errors errors) {
        Sprint newSprint = (Sprint) obj;
        /*
         * String s = messageSource.getMessage("name.required", null, Locale.US); System.out.println(s);
         */
        // check all fields require
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "active", messageSource.getMessage("active.required", null, Locale.US));
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", messageSource.getMessage("name.required", null, Locale.US));
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "startDate", messageSource.getMessage("startDate.required", null, Locale.US));
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "endDate", messageSource.getMessage("endDate.required", null, Locale.US));
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "sprintstate", messageSource.getMessage("sprintstate.required", null, Locale.US));

        // check start date is less than end date
        if (!errors.hasFieldErrors("startDate") && !errors.hasFieldErrors("startDate")) {
            if (newSprint.getStartDate().after(newSprint.getEndDate())
                    || newSprint.getStartDate().equals(newSprint.getEndDate())) {
                errors.rejectValue("startDate", messageSource.getMessage("startDate.afterEndDate", null, Locale.US));
                errors.rejectValue("endDate", messageSource.getMessage("endDate.beforeStartDate", null, Locale.US));
            }
        }
        // validate name
        if (!errors.hasFieldErrors("name")) {
            Sprint duplicate = sprintService.getByProjectAndName(newSprint.getProject(), newSprint.getName());
            if (duplicate!=null && (newSprint.getId()==null || duplicate.getId() == newSprint.getId())) {
                errors.rejectValue("name", messageSource.getMessage("name.duplicate", new Object[] { newSprint.getName() }, Locale.US),"Name is duplicated.");
               
            }
        }

    }

}