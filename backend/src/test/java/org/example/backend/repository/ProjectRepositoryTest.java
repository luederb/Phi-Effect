package org.example.backend.repository;

import org.example.backend.model.Project;
import org.example.backend.service.ProjectService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class ProjectRepositoryTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @Test
    @DisplayName("Test findAll")
    void testFindAll() {
        when(projectRepository.findAll()).thenReturn(Arrays.asList(new Project(), new Project()));

        List<Project> projects = projectService.getAllProjects();

        assertEquals(2, projects.size());
    }

    @Test
    @DisplayName("Test findById")
    void testFindById() {
        Project mockProject = new Project();
        mockProject.setId("1");
        when(projectRepository.findById("1")).thenReturn(Optional.of(mockProject));

        Project project = projectService.getProjectById("1");

        assertEquals("1", project.getId());
    }

}