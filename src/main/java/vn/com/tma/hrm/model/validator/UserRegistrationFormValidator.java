package vn.com.tma.hrm.model.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
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
    }

    private void validatePasswords(Errors errors, UserRegistrationForm registrationForm) {
        if (!registrationForm.getPassword().equals(registrationForm.getPasswordRepeated())) {
            errors.reject("password.no_match", "Passwords do not match!");
        }
    }

    private void validateEmail(Errors errors, UserRegistrationForm registrationForm) {
        if (userService.getUserByEmail(registrationForm.getEmail()).isPresent()) {
        	System.out.println("validator: email is exist");
            errors.reject("email.exists", "User with this email already exists!");
        }
    }

    private void validateUsername(Errors errors, UserRegistrationForm registrationForm) {
        if (userService.getUserByUsername(registrationForm.getUsername()).isPresent() ) {
        	System.out.println("validator: username is exist");
            errors.reject("username.exists", "User with this username already exists!");
        }
    }
}
