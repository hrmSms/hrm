package vn.com.tma.hrm.security;

import java.util.Collection;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@Service
public class UserProfileService {
	private static final Logger logger = LogManager.getLogger(UserProfileService.class);
	
    public UserDetails getCurrentUser() {
    	logger.debug("current user adivise");
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (authentication == null) ? null : (UserDetails) authentication.getPrincipal();
    }
    
    public boolean hasRole(String role) {
    	  @SuppressWarnings("unchecked")
		Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>)
    	  SecurityContextHolder.getContext().getAuthentication().getAuthorities();
    	  boolean hasRole = false;
    	  for (GrantedAuthority authority : authorities) {
    	     hasRole = authority.getAuthority().equals(role);
    	     if (hasRole) {
    		  break;
    	     }
    	  }
    	  return hasRole;
    	}
}
