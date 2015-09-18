package vn.com.tma.hrm.model;

import java.util.Locale;

import org.springframework.context.ApplicationEvent;

import vn.com.tma.hrm.entities.User;

public class OnRegistrationCompleteEvent extends ApplicationEvent {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	User user;
    Locale locale;
    String appUrl;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Locale getLocale() {
        return locale;
    }

    public void setLocale(Locale locale) {
        this.locale = locale;
    }

    public String getAppUrl() {
        return appUrl;
    }

    public void setAppUrl(String appUrl) {
        this.appUrl = appUrl;
    }

    public OnRegistrationCompleteEvent(User registered, Locale locale, String appUrl) {
        super(registered);
        this.user = registered;
        this.locale = locale;
        this.appUrl = appUrl;
    }

}
