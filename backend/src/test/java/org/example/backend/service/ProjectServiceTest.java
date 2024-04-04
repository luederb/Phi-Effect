package org.example.backend.service;

import org.example.backend.model.Project;
import org.example.backend.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        projectService = new ProjectService(projectRepository);
    }
    @Test
    void getProjectTest() {
        Project mockProject = new Project();
        mockProject.setId("1");
        when(projectRepository.findById("1")).thenReturn(Optional.of(mockProject));

        Project project = projectService.getProjectById("1");

        assertEquals("1", project.getId());
    }

    @Test
    void saveProjectTest() {
        Project mockProject = new Project();
        mockProject.setId("1");
        when(projectRepository.save(any(Project.class))).thenReturn(mockProject);

        Project savedProject = projectService.saveNewProject(new Project());

        assertEquals("1", savedProject.getId());
    }
}