package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Project;
import org.example.backend.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        try {
            return projectService.getAllProjects();
        } catch (NoSuchElementException e) {
            return List.of();
        }
    }
    @GetMapping("{id}")
    public Project getProjectById(@PathVariable String id){
        return projectService.getProjectById(id);
    }
    @PostMapping
    public Project saveNewProject(@RequestBody Project project){
        return projectService.saveNewProject(project);
    }

}
