package vn.com.tma.hrm.repository;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.*;

import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;


import vn.com.tma.hrm.entities.Project;

@Component
@RepositoryEventHandler(Project.class)
public class ProjectEventHandler {
	
	Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());

    public static final String NEW_NAME = "**modified**";

	    
	    
	    /**
	     * Called before {@link Project} is persisted
	     * 
	     * @param agent
	     */
	    @HandleBeforeCreate
	    public void handleBeforeCreates(Project agent) {

	    	//System.out.println("[Before Create] Setting Agent name to " + agent.getName());
	        //agent.setName(NEW_NAME + agent.getName());
	        agent.setClientId(1);
	        agent.setProjectOwner(1);
	        
	        log.info("[Before Create] Setting Agent name to " + agent.getName());
	        log.info("[Before Create] getClientId " + agent.getClientId());

	    }

	    /**
	     * Called before {@link Project} is persisted
	     * 
	     * @param agent
	     */
	    @HandleBeforeSave
	    public void handleBeforeSave(Project agent) {
	       // agent.setName(NEW_NAME + "..update");
	        log.info("[Before Save] Setting Agent name to " + agent.getName());

	    }	    


}
