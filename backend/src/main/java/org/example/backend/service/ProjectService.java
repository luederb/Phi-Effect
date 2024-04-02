package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.model.Project;
import org.example.backend.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project saveNewProject(Project project) {
        projectRepository.save(project);
        return projectRepository.findById(project.getId()).orElseThrow();
    }

    public Project getProjectById(String id) {
        return projectRepository.findById(id).orElseThrow();
    }
}
