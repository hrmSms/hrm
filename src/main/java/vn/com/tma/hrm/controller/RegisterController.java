package vn.com.tma.hrm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.VerificationToken;
import vn.com.tma.hrm.model.OnRegistrationCompleteEvent;
import vn.com.tma.hrm.model.UserRegistrationForm;
import vn.com.tma.hrm.services.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.io.IOException;
import java.util.Calendar;
import java.util.Locale;

/**
 * Created by Administrator on 8/31/2015.
 */
@Controller
public class RegisterController {

	@Autowired
	UserService userService;

	@Autowired
	MessageSource messageSource;

	@Autowired
	ApplicationEventPublisher applicationEventPublisher;

	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String getRegisterPage() {
		// return new ModelAndView("register", "registrationForm", new UserRegistrationForm());
		return "register";
	}
	 
	@RequestMapping(value = "/validate", method = RequestMethod.POST)
	public @ResponseBody UserRegistrationForm validateInput( @RequestBody UserRegistrationForm regForm) {
		if (userService.getUserByEmail(regForm.getEmail()).isPresent())
			regForm.setEmailValidated(false);
		else
			regForm.setEmailValidated(true);

		if (userService.getUserByUsername(regForm.getUsername()).isPresent()) 
			regForm.setUsernameValidated(false);
		else
			regForm.setUsernameValidated(true);

		return regForm;
	}


	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public  ResponseEntity<String> registerUserAccount(@Valid @RequestBody UserRegistrationForm regForm, BindingResult result, HttpServletRequest request)   {		
		//
		// Code processing the input parameters
		//	
		System.out.println("binding result: " + result.getAllErrors());
		if (result.hasErrors()) {
			return new ResponseEntity<String>("{ \"error\" : \"" + "Input Values are NOT correct" + " \"} ", HttpStatus.OK);
		}
		String msg = null;
		try {
			User registered = userService.registerNewUserAccount(regForm);
			String appUrl = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
			System.out.println("appUrl: " + appUrl);
			applicationEventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, request.getLocale(), appUrl));
			msg = "Account " + registered.getUsername() + " is created";
		} catch (DataIntegrityViolationException e) {
			e.printStackTrace();
			return new ResponseEntity<String>("{ \"error\" : \"" + "duplicate record" + " \"} ", HttpStatus.OK);
		}
		//return "greeting";
		return new ResponseEntity<String>("{ \"success\" : \"" + msg + " \"} ", HttpStatus.CREATED);

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
