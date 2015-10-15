package vn.com.tma.hrm.security;

import org.springframework.security.core.authority.AuthorityUtils;

import vn.com.tma.hrm.entities.Role;
import vn.com.tma.hrm.entities.User;

public class CurrentUser extends org.springframework.security.core.userdetails.User {
    private User user;

    public CurrentUser(User user) {
        super(user.getEmail(), user.getPassword(), user.isEnabled(),
        		user.isNonExpired(), true, true, AuthorityUtils.createAuthorityList(user.getRole().toString()));
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return user.getId();
    }

    public Role getRole() {
        return user.getRole();
    }
}