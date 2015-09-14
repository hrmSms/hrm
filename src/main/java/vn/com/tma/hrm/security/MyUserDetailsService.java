package vn.com.tma.hrm.security;

import org.apache.log4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import vn.com.tma.hrm.entities.CurrentUser;
import vn.com.tma.hrm.entities.Role;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.repository.UserRepository;
import vn.com.tma.hrm.services.UserService;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * UserDetails service that reads the user credentials from the database, using a JPA repository.
 *
 */
@Component
public class MyUserDetailsService implements UserDetailsService {

    private static final Logger LOGGER = Logger.getLogger(MyUserDetailsService.class);

    @Autowired
    UserService userService;

	

    /*@Override
    public CurrentUser loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("load user from here");
        LOGGER.debug("Authenticating user with email={}");
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with email=% was not found", email)));
        return new CurrentUser(user);
    }*/
    @Override
    public CurrentUser loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("load user from here");
        LOGGER.debug("Authenticating user with email={}");
        return new CurrentUser(new User("", "", Role.ADMIN));
    }
}
