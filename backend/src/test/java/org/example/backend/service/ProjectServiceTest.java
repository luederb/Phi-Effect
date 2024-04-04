package org.example.backend.service;

import org.example.backend.model.Project;
import org.example.backend.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        projectService = new ProjectService(projectRepository);
    }

    @Test
    @DisplayName("Should return all projects")
    void shouldReturnAllProjects() {
        when(projectRepository.findAll()).thenReturn(Collections.singletonList(new Project()));

        List<Project> projects = projectService.getAllProjects();

        assertEquals(1, projects.size());
    }

    @Test
    @DisplayName("Should return empty list when there are no projects")
    void shouldReturnEmptyListWhenNoProjects() {
        when(projectRepository.findAll()).thenReturn(Collections.emptyList());

        List<Project> projects = projectService.getAllProjects();

        assertTrue(projects.isEmpty());
    }
}