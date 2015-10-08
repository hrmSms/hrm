package vn.com.tma.hrm.model;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Transient;

public class UserRegistrationForm {

    @NotEmpty
    @Pattern(regexp="^([a-zA-Z0-9]+)$", message="Username is NOT valid")
    private String username = "";

    @NotEmpty
    @Email
    @Pattern(regexp="^[_a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$", message="Email is NOT valid")
    private String email = "";

    @NotEmpty
    @Length(min=3, max=20, message="Password should be between 3 - 20 charactes")
    private String password = "";

  
    @Transient
    private boolean agreement = false;
    
    @Transient
    private boolean emailValidated = false;

    @Transient
    private boolean usernameValidated = false;
    
    @Transient
    private boolean passwordValidated = false;
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

 
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

	public boolean isAgreement() {
		return agreement;
	}

	public void setAgreement(boolean agreement) {
		this.agreement = agreement;
	}

	public boolean isEmailValidated() {
		return emailValidated;
	}

	public void setEmailValidated(boolean emailValidated) {
		this.emailValidated = emailValidated;
	}

	public boolean isUsernameValidated() {
		return usernameValidated;
	}

	public void setUsernameValidated(boolean usernameValidated) {
		this.usernameValidated = usernameValidated;
	}

	public boolean isPasswordValidated() {
		return passwordValidated;
	}

	public void setPasswordValidated(boolean passwordValidated) {
		this.passwordValidated = passwordValidated;
	}

}
