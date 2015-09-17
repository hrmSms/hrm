package vn.com.tma.hrm.services;

import java.util.Collection;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.VerificationToken;
import vn.com.tma.hrm.model.UserRegistrationForm;


@Service
public interface UserService {
	
    Optional<User> getUserById(long id);

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByUsername(String username);

    Collection<User> getAllUsers();

    User registerNewUserAccount(UserRegistrationForm form);

    User saveRegisteredUser(User user);

    void createVerificationTokenForUser(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);
}
