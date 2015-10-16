package vn.com.tma.hrm.listener;


import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.model.RegistrationEvent;
import vn.com.tma.hrm.services.UserService;

@Component
public class RegistrationListener implements ApplicationListener<RegistrationEvent> {

    @Autowired
    UserService userService;

    @Autowired
    private MessageSource messages;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    Environment evironment;

    @Override
    @Async
    public void onApplicationEvent(RegistrationEvent event) {
        System.out.println("Go to Listener");
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        userService.createVerificationTokenForUser(user, token);
        SimpleMailMessage email = constructEmailMessage(event, user, token);
        mailSender.send(email);
    }

    
    private final SimpleMailMessage constructEmailMessage(RegistrationEvent event, User user, String token) {
        final String recipientAddress = user.getEmail();
        final String subject = "Registration Confirmation";
        final String confirmationUrl = event.getAppUrl() + "/registrationConfirm?token=" + token;
        final String message = messages.getMessage("message.regActive", null, event.getLocale());
        final SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + " \r\n" + confirmationUrl);
        email.setFrom(evironment.getProperty("support.email"));
        return email;
    }
}
