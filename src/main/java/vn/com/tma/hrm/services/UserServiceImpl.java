package vn.com.tma.hrm.services;

import  vn.com.tma.hrm.repository.UserRepository;
import vn.com.tma.hrm.entities.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

/**
 * Created by Administrator on 8/10/2015.
 */

@Component
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

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
        return userRepository.findOneByEmail(username);
    }

    @Override
    public Collection<User> getAllUsers() {
        return (Collection<User>) userRepository.findAll();
    }


}

