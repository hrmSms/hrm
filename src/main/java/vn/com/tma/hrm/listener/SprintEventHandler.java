package vn.com.tma.hrm.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

import vn.com.tma.hrm.entities.Sprint;

@Component
@RepositoryEventHandler(Sprint.class)
public class SprintEventHandler {
    Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());
    
    @HandleBeforeCreate
    public void handleBeforeCreate(Sprint newSprint){
        System.out.println(newSprint.getName());
        System.out.println(newSprint.getProject());
    }
    
    @HandleBeforeSave
    public void handleBeforeSave(Sprint updateSprint){
        log.info(updateSprint.getName());
    }
}
