package org.example.backend.service;

import org.example.backend.model.Project;
import org.example.backend.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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
    void getAllProjectsTest() {
        Project mockProject1 = new Project();
        mockProject1.setId("1");
        Project mockProject2 = new Project();
        mockProject2.setId("2");
        when(projectRepository.findAll()).thenReturn(Arrays.asList(mockProject1, mockProject2));

        List<Project> projects = projectService.getAllProjects();

        assertEquals(2, projects.size());
        assertEquals("1", projects.get(0).getId());
        assertEquals("2", projects.get(1).getId());
    }

    @Test
    void saveNewProjectTest() {
        Project mockProject = new Project();
        mockProject.setId("1");
        when(projectRepository.save(any(Project.class))).thenReturn(mockProject);

        Project newProject = new Project();
        Project savedProject = projectService.saveProject(newProject);

        assertEquals("1", savedProject.getId());
    }
    @Test
    void getProjectByIdTest() {
        Project mockProject = new Project();
        mockProject.setId("1");
        when(projectRepository.findById("1")).thenReturn(Optional.of(mockProject));

        Project project = projectService.getProjectById("1");

        assertEquals("1", project.getId());

        when(projectRepository.findById("2")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> projectService.getProjectById("2"));
    }
}