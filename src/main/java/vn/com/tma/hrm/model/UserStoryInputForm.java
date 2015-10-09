package vn.com.tma.hrm.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotEmpty;

import vn.com.tma.hrm.entities.Sprint;
import vn.com.tma.hrm.entities.User;
import vn.com.tma.hrm.entities.UserStoryState;

public class UserStoryInputForm {

	@NotEmpty
	private String name = "";
	
	private User owner = null;
	
	@NotNull
	private UserStoryState userStoryState = null;
	
	private UserStoryState userStoryStatus = null;
	
	@Pattern.List({
		@Pattern(regexp="[-+]?[0-9]*.?[0-9]+"),
		@Pattern(regexp="^s*$")
	})
	private Float planEst;
	
	@Pattern.List({
		@Pattern(regexp="[-+]?[0-9]*.?[0-9]+"),
		@Pattern(regexp="^s*$")
	})
	private Float todoEst;
	
	@Pattern.List({
		@Pattern(regexp="[-+]?[0-9]*.?[0-9]+"),
		@Pattern(regexp="^s*$")
	})
	private Float actual;
	
    private String description = "";
    
	private Sprint sprint = null;
	
	@Pattern.List({
		@Pattern(regexp="^(0|[1-9][0-9]*)$"),
		@Pattern(regexp="^s*$")
	})
	private Long velocity;
    
	@Pattern.List({
		@Pattern(regexp="^(0|[1-9][0-9]*)$"),
		@Pattern(regexp="^s*$")
	})
	private Long businessValue;
	
	@Pattern.List({
		@Pattern(regexp="^(0|[1-9][0-9]*)$"),
		@Pattern(regexp="^s*$")
	})
	private Long point;
	
    private String note = "";
}
