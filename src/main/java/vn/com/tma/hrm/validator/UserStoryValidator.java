package vn.com.tma.hrm.validator;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.UserStory;
import vn.com.tma.hrm.services.SprintService;
import vn.com.tma.hrm.services.UserStoryService;

@Service
public class UserStoryValidator implements Validator{

	 	@Autowired
	    UserStoryService usService;

	    @Autowired
	    MessageSource messageSource;

	    @Override
	    public boolean supports(Class<?> clazz) {
	        return clazz.equals(UserStory.class);
	    }

	    @Override
	    public void validate(Object obj, Errors errors) {
	    	UserStory userStory = (UserStory) obj;
	    	 System.out.println("go here to validate");
	    	// check all fields require
	    	 ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", messageSource.getMessage("name.required", null, Locale.US));
	    	 ValidationUtils.rejectIfEmptyOrWhitespace(errors, "state", messageSource.getMessage("userStoryState.required", null, Locale.US));
	    	 
	    	// validate name
	         if (!errors.hasFieldErrors("name")) {
	             if(usService.getByProjectAndName(userStory.getProject(), userStory.getName()).isPresent()
	            		 && userStory.getId() == null) 
	                 errors.rejectValue("name", messageSource.getMessage("name.duplicate", new Object[] { userStory.getName() }, Locale.US),"Name is duplicated.");
	             
	         }
	    }
}
