package vn.com.tma.hrm.model.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import vn.com.tma.hrm.model.UserRegistrationForm;
import vn.com.tma.hrm.services.UserService;

@Service
public class UserRegistrationFormValidator implements Validator{
    @Autowired
    UserService userService;

    @Override
    public boolean supports(Class<?> clazz) {
        return clazz.equals(UserRegistrationForm.class);
    }

/*    @Autowired
    public UserCreateFormValidator() {
    }*/

    @Override
    public void validate(Object target, Errors errors) {
        UserRegistrationForm registrationForm = (UserRegistrationForm) target;
        validateEmail(errors, registrationForm);
        validateUsername(errors, registrationForm);
        validatePasswords(errors, registrationForm);
        validateAgreement(errors, registrationForm);
    }

    private void validatePasswords(Errors errors, UserRegistrationForm registrationForm) {
    	ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "password.required");
    	if (!registrationForm.getPassword().equals(registrationForm.getPasswordRepeated())) {
            errors.reject("password.no_match");
        }
    }

    private void validateEmail(Errors errors, UserRegistrationForm registrationForm) {
    	ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "email.required");
        if (userService.getUserByEmail(registrationForm.getEmail()).isPresent()) {
        	System.out.println("validator: email is exist");
            errors.reject("email.exists");
        }
    }

    private void validateUsername(Errors errors, UserRegistrationForm registrationForm) {
    	ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "username.required");
        if (userService.getUserByUsername(registrationForm.getUsername()).isPresent() ) {
        	System.out.println("validator: username is exist");
            errors.reject("username.exists");
        }
    }
    
    private void validateAgreement(Errors errors, UserRegistrationForm registrationForm) {
    	if (registrationForm.isAgreement() == false) {
    		errors.reject("agreement.no_check");
    	}
    }
}
