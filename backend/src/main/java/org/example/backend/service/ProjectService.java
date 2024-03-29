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

    private final Project project1 = new Project(
            "1", "testProject1", "Lueder", "Tunis", "testDescription1", "drama", "open", "E.123.456.W.7", "01.04.2024", "01.05.2024");
    private final Project project2 = new Project(
            "2", "testProject2", "Marion", "Mannheim", "testDescription2", "romance", "unclear", "E.456.789.W.6", "01.06.2024", "01.07.2024");
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
