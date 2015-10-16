package vn.com.tma.hrm.services;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import vn.com.tma.hrm.entities.Role;
import vn.com.tma.hrm.entities.TaskState;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.VerificationToken;
import vn.com.tma.hrm.model.UserRegistrationForm;
import vn.com.tma.hrm.repository.UserRepository;
import vn.com.tma.hrm.repository.VerificationTokenRepository;

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    VerificationTokenRepository verificationTokenRepository;
    
    @Override
    public Optional<User> getUserById(long id) {
        return Optional.ofNullable(userRepository.findOne(id));
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findOneByEmail(email);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findOneByUsername(username);
    }

    @Override
    public Collection<User> getAllUsers() {
        return (Collection<User>) userRepository.findAll();
    }

    public User registerNewUserAccount(UserRegistrationForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setEmail(form.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(form.getPassword()));
        user.setNonExpired(false);
        user.setEnabled(false);
        user.setRole(Role.ROLE_USER);
        return userRepository.save(user);
    }

    @Override
    public User saveRegisteredUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void createVerificationTokenForUser(User user, String token) {
        final VerificationToken myToken = new VerificationToken(token, user);
        verificationTokenRepository.save(myToken);
    }

    @Override
    public VerificationToken getVerificationToken(String VerificationToken) {
        return verificationTokenRepository.findByToken(VerificationToken);
    }
    
    @Override
	@Transactional(value="txManager") 
	public List<User> getAll(){
		return userRepository.findAll();
	}
}
