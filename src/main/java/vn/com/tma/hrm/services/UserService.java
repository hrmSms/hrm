package vn.com.tma.hrm.services;

import java.util.Collection;
import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.com.tma.hrm.entities.User;


@Service
public interface UserService {
	
    Optional<User> getUserById(long id);

    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByUsername(String username);

    Collection<User> getAllUsers();

}
