package vn.com.tma.hrm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.VerificationToken;
import vn.com.tma.hrm.model.OnRegistrationCompleteEvent;
import vn.com.tma.hrm.model.UserRegistrationForm;
import vn.com.tma.hrm.model.validator.UserRegistrationFormValidator;
import vn.com.tma.hrm.services.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.Calendar;
import java.util.Locale;

/**
 * Created by Administrator on 8/31/2015.
 */
@Controller
public class RegisterController {
    @Autowired
    UserRegistrationFormValidator userRegistrationFormValidator;

    @Autowired
    UserService userService;

    @Autowired
    MessageSource messageSource;

    @Autowired
    ApplicationEventPublisher applicationEventPublisher;

    @InitBinder("registrationForm")
    public void initRegistrationBinder(WebDataBinder binder) {
        binder.addValidators(userRegistrationFormValidator);
    }
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public ModelAndView getRegisterPage() {
        return new ModelAndView("register", "registrationForm", new UserRegistrationForm());
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerUserAccount(@Valid @ModelAttribute("registrationForm") UserRegistrationForm form,
                                      BindingResult bindingResult, HttpServletRequest request) {
        System.out.println("It goes here");
        if (bindingResult.hasErrors()) {
            return "register";
        }
        try {
            User registered = userService.registerNewUserAccount(form);
            String appUrl = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
            System.out.println("appUrl: " + appUrl);
            applicationEventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, request.getLocale(), appUrl));
        } catch (DataIntegrityViolationException e) {
            bindingResult.reject("email.exists", "Email already exists");
            return "register";
        }
        return "/greeting";
    }


    @RequestMapping(value = "/registrationConfirm", method = RequestMethod.GET)
    public String confirmRegistration(final Locale locale, final Model model, @RequestParam("token") final String token) {
        final VerificationToken verificationToken = userService.getVerificationToken(token);
        if (verificationToken == null) {
            final String message = messageSource.getMessage("auth.message.invalidToken", null, locale);
            model.addAttribute("message", message);
            return "baduser";
        }

        final User user = verificationToken.getUser();
        final Calendar cal = Calendar.getInstance();
        if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            model.addAttribute("message", messageSource.getMessage("auth.message.expired", null, locale));
            model.addAttribute("expired", true);
            model.addAttribute("token", token);
            return "baduser";
        }

        user.setEnabled(true);
        user.setNonExpired(true);
        userService.saveRegisteredUser(user);
        model.addAttribute("message", messageSource.getMessage("message.accountVerified", null, locale));
        return "registrationconfirm";
    }
}
